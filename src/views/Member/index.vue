<template>
  <div class="manage">
    <!-- 对话框Dialog组件 -->
    <el-dialog :title="operateType === 'add'?'新增会员':'更新会员'" :visible.sync="isShow">
      <common-form :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="dialogForm" :rules="rules"></common-form>
      <!-- 自定义底部(插槽) -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <!-- 新增按钮和搜索按钮 -->
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form :formLabel="formLabel" :form="searchForm" :inline="true" ref="searchForm" @submit.native.prevent @keydownForEnter="getList(searchForm.keyword)">
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>
    <!-- 封装的表格引用 -->
    <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList('')" @edit="editUser" @del="delUser">
      <!-- extra具名插槽 -->
      <template v-slot:extra>
        <el-table-column label="操作" min-width="300">
          <template slot-scope="scope">
            <el-button size="mini" @click="editUser(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </common-table>
  </div>
</template>

<script>
import CommonForm from '../../components/CommonForm.vue'
import CommonTable from '../../components/CommonTable.vue'
import { getUser } from '../../api/data'
export default {
  name: 'UsersPage',
  components: {
    CommonForm,
    CommonTable
  },
  data () {
    return {
      // 是添加会员还是更新会员
      operateType: 'add',
      // 对话框显示
      isShow: false,
      // 表单检验是否通过
      formVaild: true,
      // 对话框标签名数组
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      // 对话框标签数据,与CommonForm内部双向绑定
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: '',
      },
      // 查询按钮的标签名数组
      formLabel: [
        {
          model: 'keyword',//keyword对应楼下searchForm的数据名
          label: '',
          type: 'input'
        }
      ],
      // 查询按钮的数据
      searchForm: {
        keyword: '',
      },
      // 表格数据
      tableData: [],
      // 表格头部的标签名
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      // 表格校验规则
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入性别', trigger: 'blur' }
        ],
        birth: [
          { required: true, message: '请输入出生日期', trigger: 'blur' }
        ],
        addr: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
      },
      // 分页的配置数据,page,total,pageSize三个参数要传入
      config: {
        page: 1,//默认值
        total: 30,//总共的数据量
        pageSize: 20
      },
    }
  },
  methods: {
    // 提示框复用函数,成功的code值,实际的code值,提示消息,同时成功返回true,失败返回false
    MessageState (successCode, realCode, message) {
      if (realCode == successCode) {
        this.$message({
          type: "success",
          message
        })
        this.getList()
        return true
      }
      else {
        this.$message({
          type: "warning",
          message
        })
        return false
      }
    },
    // 确定按钮监听事件
    confirm () {
      this.$refs.dialogForm.$refs.myForm.validate((vaild) => {
        if (vaild) this.formVaild = true
        else this.formVaild = false
      })
      if (!this.formVaild) return;//表单不合校验的话直接不给过
      // 编辑会员逻辑
      if (this.operateType === 'edit') {
        this.$http.post('/user/edit', this.operateForm).then(res => {
          // console.log(res)
          this.isShow = false
          const { code, data } = res.data
          const { message } = data
          this.MessageState(20000, code, message)
        })
      }
      // 新增会员逻辑
      else {
        this.$http.post('/user/add', this.operateForm).then(res => {
          // console.log(res)
          this.isShow = false
          const { code, data } = res.data
          const { message } = data
          if (code == 20000) this.config.page = 1//如果新增成功了就跳转到第一页
          this.MessageState(20000, code, message)
        })
      }
    },
    // 新增会员事件
    addUser () {
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: '',
      }

    },
    // 查询会员事件
    getList (name = '') {
      this.config.loading = true,//显示loading
        // console.log(this.config.page)
        name !== '' ? (this.config.page = 1) : ''//查询具体name的时候要把分页变为第一页
      // console.log(this.config.page)
      getUser({
        name,
        page: this.config.page
      }).then(({ data: res }) => {
        // console.log(res);
        this.tableData = res.list.map(item => {//处理一下性别显示
          item.sexLabel = item.sex === 0 ? "女" : "男"
          return item
        })
        this.config.total = res.count
        this.config.loading = false;//加载完后取消loading显示
      })
    },
    // 编辑会员信息事件
    editUser (row) {
      // 这里row传过来的是那一行的所有消息,如果直接赋值给了operateForm则为引用地址赋值,那operateForm变化表单也会变化
      this.operateType = 'edit'
      this.isShow = true
      //对话框要回显当前行的数据,这里要采用拷贝,由于operateForm里都是非对象属性,所以深浅拷贝都可
      this.operateForm = { ...row } //这里浅拷贝
      // console.log(this.operateForm === row)
    },
    // 删除会员事件
    delUser (row) {
      // ElementUI的通知栏组件
      this.$confirm("此操作将永久删除该组件,是否继续?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id
        this.$http.get("/user/del", {
          params: { id }
        }).then(res => {
          // console.log(res)
          const { code, data } = res.data
          const { message } = data
          this.MessageState(20000, code, message);//消息提示函数
        })
      })
    }
  },
  created () {
    this.getList();
  }
}
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>