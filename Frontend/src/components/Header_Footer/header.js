import React, { Component } from 'react'
import './header.css'
import logo from '../../assets/mainLogo.png'

var date = new Date()
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default class Header extends Component {

    componentDidMount(){
        setInterval(this.getTime, 1000)
    }

    getTime = () =>{
        var date = new Date();
        let h = String(date.getHours());
        let m = String(date.getMinutes());
        let s = String(date.getSeconds());
        
        if(Number(h) < 10){
            if(document.getElementById("hour_1") !== null && document.getElementById("hour_1").innerHTML !== '0'){
                document.getElementById("hour_1").innerHTML = '0';
            }
            if(document.getElementById("hour_2") !== null && document.getElementById("hour_2").innerHTML !== h.charAt(0)){
                document.getElementById("hour_2").innerHTML = h.charAt(0);
            }
        }else{
            if(document.getElementById("hour_1") !== null && document.getElementById("hour_1").innerHTML !== h.charAt(0)){
                document.getElementById("hour_1").innerHTML = h.charAt(0);
            }
            if(document.getElementById("hour_2") !== null && document.getElementById("hour_2").innerHTML !== h.charAt(1)){
                document.getElementById("hour_2").innerHTML = h.charAt(1);
            }
        }
        if(Number(m) < 10){
            if(document.getElementById("minute_1") !== null && document.getElementById("minute_1").innerHTML !== '0'){
                document.getElementById("minute_1").innerHTML = '0';
            }
            if(document.getElementById("minute_2") !== null && document.getElementById("minute_2").innerHTML !== m.charAt(0)){
                document.getElementById("minute_2").innerHTML = m.charAt(0);
            }
        }else{
            if(document.getElementById("minute_1") !== null && document.getElementById("minute_1").innerHTML !== m.charAt(0)){
                document.getElementById("minute_1").innerHTML = m.charAt(0);
            }
            if(document.getElementById("minute_2") !== null && document.getElementById("minute_2").innerHTML !== m.charAt(1)){
                document.getElementById("minute_2").innerHTML = m.charAt(1);
            }
        }
        if(Number(s) < 10){
            if(document.getElementById("second_1") !== null){
                document.getElementById("second_1").innerHTML = 0;
            } 
            if(document.getElementById("second_2") !== null){
                document.getElementById("second_2").innerHTML = s.charAt(0);
            }
        }else{
            if(document.getElementById("second_1") !== null){
                document.getElementById("second_1").innerHTML = s.charAt(0);
            } 
            if(document.getElementById("second_2") !== null){
                document.getElementById("second_2").innerHTML = s.charAt(1);
            }
        }
    }
    render() {
        return (
            <div className="common_header container">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">                
                <img src={logo} className="img-responsive" alt="logo" />  
                </div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div className="datetime">
                        <ul className="pagination chung">
                            <li id="hour_1" className="border">{String(date.getHours()).length === 1 ? 0 : String(date.getHours()).charAt(0)}</li> 
                            <li id="hour_2" className="border">{String(date.getHours()).length === 1 ? String(date.getHours()).charAt(0) : String(date.getHours()).charAt(1)}</li> <b className="dau2cham">:</b> &nbsp;
                            <li id="minute_1" className="border">{String(date.getMinutes()).length === 1 ? 0 : String(date.getMinutes()).charAt(0)}</li>
                            <li id="minute_2" className="border">{String(date.getMinutes()).length === 1 ? String(date.getMinutes()).charAt(0) : String(date.getMinutes()).charAt(1)}</li> <b className="dau2cham">:</b> &nbsp;
                            <li id="second_1" className="border">{String(date.getSeconds()).length === 1 ? 0 : String(date.getSeconds()).charAt(0)}</li> 
                            <li id="second_2" className="border">{String(date.getSeconds()).length === 1 ? String(date.getSeconds()).charAt(0) : String(date.getSeconds()).charAt(1)}</li>
                        </ul>
                        <p className="theP">{`${weekday[date.getDay()]} ${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`}</p>
                    </div>
                </div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 info">
                    <b><i className="glyphicon glyphicon-user"></i> &nbsp;
                    {this.props.Name}
                    </b>
                </div>
                
            </div>
        )
    }
}
