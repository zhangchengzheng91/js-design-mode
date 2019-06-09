/*
* 做好笔录 --- 备忘录模式（Memento）:在不破坏对象的封装性的前提下，在对象之外补获并保存该对象
* 内部的状态以便日后对象使用或者对象恢复到以前某个状态。
*
*
* 工作中的备忘录
* 打开页面中的换肤的设置层，第一次打开是要向服务器端发送请求来获取响应数据的，但是第二次就不需
* 要再发送了，我们可以将第一次获取的数据缓存下来即可。再有MVC架构中的M（Model）部分。其实很多
* 时候它都会缓存一些数据，供视图或者控制器模块使用。这些都是应用了备忘录模式的思想而实现的。
*
* 备忘录模式最主要的任务是对现有的数据或状态做缓存，为将来某个时刻使用或恢复做准备。在Javascript
* 编程中，备忘录模式常常运用于对数据的缓存备份，浏览器端获取的数据往往是从服务器端请求获取到的，而
* 请求流程往往是以时间与流量为代价的。因此对重复性数据反复请求不仅增加了服务器端的压力，而且造成
* 浏览器端对数据请求的等待进而影响用户体验。
* 在备忘录模式中，数据常常存储在备忘录对象的缓存器中，这样对于数据的读取必定要通过调用备忘录提供的
* 方法，因此备忘录对象也是对数据缓存器的一次保护性封装，防止外界的直接访问，方便数据管理，防范外
* 界对象对数据的使用。一旦备忘录对象发现请求的数据或者状态在缓存器中已存在，将直接从缓存器中读取，
* 从而降低对数据的获取成本。
* 当数据量过大时，会严重占用系统提供的资源，这会极大降低系统性能。此时对缓存器的缓存策略优化是很
* 很必要的，复用率低的数据缓存下来是不值得的。因此资源空间的限制是影响备忘录模式应用的一大障碍。
* 不过随着硬件水平的提高以及浏览器的不断优化，相信资源空间的限制在不久的将来也会得到改善。
* */
