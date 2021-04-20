<template>
  <div>
    <div class="titleTable">
      <button> create user</button>
    </div>
    <a-table :row-selection="rowSelection" :data-source="data" :columns="columns" rowKey="id" >
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="c => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block;"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          Search
        </a-button>
        <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
          Reset
        </a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="customRender" slot-scope="text, record, index, column">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
              class="highlight"
              >{{ fragment }}</mark
            >
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>
          {{ text }}
        </template>
      </template>
      <template slot="action" slot-scope="text, record">
        <div class="group__button">
          <a-button type="primary" @click="editUser(record)">
            Edit
          </a-button>
          <a-popconfirm
            title="Sure to delete?"
            @confirm="() => onDelete(record.id)"
          >
            <a-button type="danger">
              Delete
            </a-button>
          </a-popconfirm>
        </div>
      </template>
    </a-table>

    <div >
      <a-modal v-model="visible" title="Basic Modal" @ok="handleOk" class="my-modal" >
        <MyForm></MyForm>
      </a-modal>
    </div>
  </div>
</template>
<script>
import MyForm from './form';

export default {
  data() {
    return {
      visible:  this.getIsModal,
      data: [],
      searchText: '',
      searchInput: null,
      selectedRowKeys: [],
      dataSelect: '',
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.name
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: 'UserName',
          dataIndex: 'userName',
          key: 'username',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.address
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
        },
        {
          title: 'E-mail',
          dataIndex: 'email',
          key: 'email',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.email
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.address
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.address
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
        },
        {
          title: 'action',
          dataIndex: 'action',
          key: 'action',
          scopedSlots: {customRender: 'action'}
        },
      ],
    };
  },

  watch: {
    visible() {
      this.$store.commit("SET_IS_MODAL",this.visible)
    }
  },
  components: {
    MyForm
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        selections: [
          {
            key: 'all-data',
            text: 'Select All Data',
            onSelect: () => {
              this.selectedRowKeys = [...Array(46).keys()]; // 0...45
            },
          },
          {
            key: 'odd',
            text: 'Select Odd Row',
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (index % 2 !== 0) {
                  return false;
                }
                return true;
              });
              this.selectedRowKeys = newSelectedRowKeys;
            },
          },
          {
            key: 'even',
            text: 'Select Even Row',
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (index % 2 !== 0) {
                  return true;
                }
                return false;
              });
              this.selectedRowKeys = newSelectedRowKeys;
            },
          },
        ],
        onSelection: this.onSelection,
      };
    },
    getIsModal() {
      return this.$store.getters.getIsModal
    }
  },
  methods: {
    onDelete(key) {
      console.log(key);
    },
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },

    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },

    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    },
    editUser(record) {
      this.visible = true
      this.$store.commit('SET_DATA', record);
    },
    handleOk() {
      this.visible = false
    },
  },
  mounted() {
    this.$store.dispatch('fetchUser')
    setTimeout(() => {
      this.data = this.$store.state.users.listUser
    }, 1000);
  }
}
</script>
<style lang="scss">
  .my-modal {
    .ant-modal {
      width: 50% !important;
    }
    .ant-modal-footer {
      display: none;
    }
  }
  .highlight {
    background-color: rgb(255, 192, 105);
    padding: 0px;
  }
  .group__button {
    text-align: center;
    button {
      &:nth-child(1) {
        margin-right: 10px;
      }
    }
  }
  .titleTable {
    display: flex;
    align-items: center;
    padding: 20px;
    button {
      border-radius: 10px;
      border: none;
      background-color: #ccc;
      padding: 10px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
    }
  }
</style>
