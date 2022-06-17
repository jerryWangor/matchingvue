<style scoped>
  .top-20 {
    margin-top: 20px
  }
</style>

<template>

  <a-button style="margin-left: 15px" @click="onReturn">返回</a-button>

  <div class="top-20">
    <a-radio-group v-model:value="symbol" button-style="solid" @change="onChangeSymbol">
      <a-radio-button value="BTC">BTC</a-radio-button>
      <a-radio-button value="USDT">USDT</a-radio-button>
    </a-radio-group>
  </div>


  <a-table :columns="columns" :data-source="data">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'Action'">
        <span v-if="record.Action === 0">挂单</span>
        <span v-if="record.Action === 1">撤单</span>
      </template>

      <template v-if="column.key === 'Side'">
        <span v-if="record.Side === 0">买</span>
        <span v-if="record.Side === 1">卖</span>
      </template>

      <template v-if="column.key === 'Status'">
        <span v-if="record.Status === 0">未成交</span>
        <span v-if="record.Status === 1">交易成功</span>
        <span v-if="record.Status === 2">部分成交</span>
        <span v-if="record.Status === 3">已撤单</span>
      </template>

      <template v-if="column.key === 'Update' && record.Status == 0">
        <span>
          <a @click="cancelOrder(record.Orderid)">撤单</a>
          <!-- <a-divider type="vertical" /> -->
        </span>
      </template>
    </template>
    </a-table>
</template>

<script>
import { defineComponent, inject, onMounted, onUnmounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  setup() {
    const wsClient = inject("wsClient"); // 接收注入
    const router = useRouter();
    const symbol = ref('BTC');
    const data = ref([]);
    const columns = [
    {
        title: '交易标',
        dataIndex: 'Symbol',
    },
    {
        title: '订单ID',
        dataIndex: 'Orderid',
        key: 'Orderid',
    },
    {
        title: '挂/撤单',
        dataIndex: 'Action',
        key: 'Action',
    },
    {
        title: '买/卖',
        key: 'Side',
        dataIndex: 'Side',
    },
    {
        title: '价格',
        key: 'Price',
        dataIndex: 'Price',
    },
    {
        title: '数量',
        key: 'Amount',
        dataIndex: 'Amount',
    },
    {
        title: '部分成交数量',
        key: 'Deal_amount',
        dataIndex: 'Deal_amount',
    },
    {
        title: '状态',
        key: 'Status',
        dataIndex: 'Status',
    },
    {
        title: '创建时间',
        key: 'Create_time',
        dataIndex: 'Create_time',
    },
    {
        title: '最后成交时间',
        key: 'Deal_time',
        dataIndex: 'Deal_time',
    },
    {
        title: '操作',
        key: 'Update',
        dataIndex: 'Update',
        // slots: {
        //     customRender: 'update',
        // },
    }];

    const cancelOrder = (orderId) => {
      // 取消订单
      const params = {"msgdata":{Symbol: symbol.value, Action: 1, OrderId: orderId},"msgtype":1}
      wsClient.sendCustomMsg(params, (res) => {
        if(res.code == 0) {
          message.success('撤单成功！');
          reViewOrders(symbol);
        } else {
          message.error('撤单失败！');
        }
      });
    }

    const onReturn = () => {
      // 返回前一页
      router.go(-1);
    };

    // 切换交易标，重新拉取数据
    const onChangeSymbol = (event)=>{
      symbol.value = event.target.value
      console.log(symbol)
      data.value = [];
      reViewOrders(symbol);
    };

    const reViewOrders = (val) => {
      // ws发送消息
      let msg = {"msgdata2":{ "status": 0, "symbol": val.value },"msgtype": 2};
      wsClient.sendCustomMsg(msg, (res) => {
        if(res.code == 0) {
          data.value = res.data;
        } else {
          message.warn("用户信息查询失败！");
        }
      })
    };

    onMounted(() => {
      reViewOrders(symbol);
    });

    return {
      onReturn,
      data,
      columns,
      cancelOrder,
      symbol,
      onChangeSymbol,
    };
  },

  components: {

  },
});
</script>