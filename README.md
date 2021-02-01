
> 在 [https://bradchan.github.io/pxt-hiibot-rungo/](https://bradchan.github.io/pxt-hiibot-rungo/) 打开此页面

## 用作扩展

此仓库可以作为 **插件** 添加到 MakeCode 中。

* 打开 [https://makecode.microbit.org/](https://makecode.microbit.org/)
* 点击 **新项目**
* 点击齿轮图标菜单下的 **扩展**
* 搜索 **https://github.com/bradchan/pxt-hiibot-rungo** 并导入

## 编辑此项目 ![构建状态标志](https://github.com/bradchan/pxt-hiibot-rungo/workflows/MakeCode/badge.svg)

在 MakeCode 中编辑此仓库。

* 打开 [https://makecode.microbit.org/](https://makecode.microbit.org/)
* 点击 **导入**，然后点击 **导入 URL**
* 粘贴 **https://github.com/bradchan/pxt-hiibot-rungo** 并点击导入

## 积木块预览

此图像显示主分支中最后一次提交的块代码。
此图像可能需要几分钟才能刷新。

![块的渲染视图](https://github.com/bradchan/pxt-hiibot-rungo/raw/master/.github/makecode/blocks.png)

#### 元数据（用于搜索、渲染）

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>

# RunGo

[RunGo is an easy-to-use STEAM educational Robot](https://www.ezaoyun.com/)

[RunGo](https://item.taobao.com/item.htm?spm=a1z0k.7386009.1997989141.8.776517ddXi708q&id=636943605571&_u=q35uvk0s2523)


## Basic usage

* Set the direction and speed of RunGo motor

```blocks
 rungo.motorRun(rungo.Motors.ML, rungo.Dir.CW, 50)
 rungo.motorRun(rungo.Motors.MR, rungo.Dir.CCW, 50)
```

* Read RunGo ultrasonic sensor 

```blocks
basic.showNumber(rungo.Ultrasonic(PingUnit.Centimeters))
```

* Stop the RunGo motor 

```blocks
rungo.motorStop(rungo.Motors.ML)
```

* Read RunGo tracking sensor

```blocks
rungo.enablePatrol(rungo.PatrolEnable.PatrolOff)
serial.writeNumber(rungo.readPatrol(rungo.Patrol.PatrolLeft))
```

* Turn on/off the Head LEDs

```blocks
rungo.writeLED(rungo.LED.LEDLeft, rungo.LEDswitch.turnOn)
```
