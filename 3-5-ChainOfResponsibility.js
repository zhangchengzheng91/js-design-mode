/*
* 行为型设计模式
* 有序车站 --- 职责链模式（Chain of Responsibility）：解决请求的发送者与请求的接受者之间的耦合，
* 通过职责链上的多个对象对分解请求流程，实现请求在多个对象之间的传递，指导最后一个对象完成请求的处理。
*
* */

/*
* 职责链模式定义了请求传递的方向，通过多个对象对请求的传递，实现一个复杂的逻辑操作。因此职责链模式将
* 负责的需求颗粒化逐一实现每个对象份内的需求，并将请求顺序的传递。对于职责链上的每一个对象来说，它都
* 可能是请求的发起者也可能是请求的接受者。通过这样的方式不仅仅简化原对象的复杂度，而且解决原请求的发
* 起者和原请求的接收者之间的耦合。当然也方便对每个阶段对象进行单元测试。同时对于中途插入的请求，此模
* 式依然使用，并可顺利对请求执行并产出结果。
*
* 对于职责链上的每一个对象不一定都能参与请求的传递，有时会造成一丝资源的浪费，并且多个对象参与请求的
* 传递，这在代码调试时增加了调试成本。
* */
