#Roxe-Earn/DODO链下计算价格js实现
## 代码结构
```
├── PricingApi.ts
├── PricingFormula.ts
├── PricingFormulaMin.ts
├── RefactoringTableJsonMin.ts
├── SlippageFormula.ts
├── TransferFeeApi.ts
├── impl
│   ├── Pricing.ts
│   ├── Storage.ts
│   └── Trader.ts
├── lib
│   ├── DODOMath.ts
│   ├── DecimalMath.ts
│   ├── SafeMath.ts
│   └── Types.ts
```
### 结构说明
* PricingApi.ts    获取链上交易对及oracle表信息
* RefactoringTableJsonMin.ts  转换表结构
* TransferFeeApi.ts 获取链上代币转账费信息及计算转账费
* PricingFormula.ts  外部接口初始化信息，买卖base代币,卖quote代币
* impl,lib 是合约计算公式js 实现



#Roxe-Swap/balancer链下计算价格js实现
## 代码结构
```
├── SwapPricingApi.ts
├── SwapRefactoringTableJson.ts
├── SwapTradeApi.ts
├── TransferFeeApi.ts
├── calc_comparisons.js
├── javainterface
│   ├── SwapApiDemo.class
│   ├── SwapApiDemo.java
│   ├── fees.json
│   ├── lib
│   │   ├── calc_comparisons.js
│   │   ├── package.json
│   │   └── swapapi.js
│   ├── mycmd.sh
│   ├── pool.json
│   ├── pools.json
│   ├── swapapimin.js
│   └── swapapiminv2.js
└── swapapi.js
```

### 结构说明
* SwapPricingApi.ts    获取链上交易池信息
* SwapRefactoringTableJson.ts  转换表结构
* TransferFeeApi.ts 获取链上代币转账费信息及计算转账费
* SwapTradeApi.ts  外部接口初始化信息，兑换代币
* calc_comparisons.js 是合约计算公式js 实现
* javainterface/swapapiminv2.js  合约计算公式es5 js实现 为java js 引擎调用的实现
* javainterface/SwapApiDemo.java  java 调用 js 查询价格