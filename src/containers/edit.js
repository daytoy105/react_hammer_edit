import React, { Component }  from 'react'
import HammerItem from 'components/hammerItem/hammer_item.js'

import './edit.scss'

export default  class Edit extends Component {
    constructor(props) {
        super(props)   
        this.state={
            uuid:0,
            aimgs:[],
            isblank:0,
        }
    }

    componentDidMount() {

    }

    // 添加图形
    addImg(i,type,e){
        this.setState({
            uuid: this.state.uuid +1         
        });
        console.log(this.state.uuid)
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        let data = {
            type:type,
            i:i,
            sort:this.state.uuid,
            t:Math.round(scrollTop + Math.random() * document.body.clientHeight / 2),
            l:Math.round(Math.random() *document.body.clientWidth   / 2),
            last_x:0,
            last_y:0,
            translate_x:0,
            translate_y:0,
            initScale:1,
            scale:1,
            initAngle:0,
            angle:0,
            editRotate:{x:0,y:0,x0:0,y0:0},
            orgin:{x:0,y:0},
            reversal:0,
            imgtools:0
        }
        const nextKeys =this.state.aimgs.concat(data) ; 
        for(let i in nextKeys){
            nextKeys[i].imgtools =0
        }
        nextKeys[nextKeys.length-1].imgtools =1 
        this.setState({
            aimgs: nextKeys,
            isblank:1
        });
    }

    subImg(i){
        const nextKeys =this.state.aimgs
        nextKeys.splice(i,1)
        this.setState({
            aimgs: nextKeys   
        });
    }

    showImgTools(k){
        let nextKeys = this.state.aimgs
        for(let i in nextKeys){
            nextKeys[i].imgtools = 0
        }
        nextKeys[k].imgtools = 1 
        this.setState({
            aimgs: nextKeys,
            isblank:1
        });
    }
    hideImgTools(){
        let nextKeys = this.state.aimgs
        for(let i in nextKeys){
            nextKeys[i].imgtools = 0
        }
        this.setState({
            aimgs: nextKeys,
            isblank:0
        });
    }
   
    render() {
        let imgs = [] , text=[];
        for(let i=1; i<7;i++){
            imgs.push(i)
        }
        let _this = this;
        let imgs_ele = this.state.aimgs.map((item,i)=>(    ///**key : 保证 dom 的唯一性  删除时避免数据渲染错乱 **/
            <HammerItem key={item.sort} item = {item} i={i} imgtools={item.imgtools} SubItem={(subid)=>this.subImg(subid)} tcolor={item.tcolor} onSaveInput={(index)=>this.handleInput(index)}  onSaveImgTools={(id)=>this.showImgTools(id)}/>        
        ))

        return (
            <div ref="edit_bg" className="edit_bg">
                <h1>React-拖拽缩放</h1>
                <div className="edit_container" ref="edit_container">
                        {imgs_ele}
                </div>
                <div className="blank" style={{display:this.state.isblank?'block':'none'}} onTouchStart={this.hideImgTools.bind(this)}></div>
                <div className="tools_image">
                {
                    imgs.map((e,i)=>(
                        <div key={i} className="ico" onClick={this.addImg.bind(this,e)}><img src={require("images/ico"+e+".png")} /></div>
                    ))
                } 
                </div>
            </div>
        )
    }       
}
