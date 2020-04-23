import React, { Component } from 'react'


class Modal extends Component {

    renderGrade = (grade, classes) =>{
        let sum = 0;
        let tc = 0;
        let xhtml = null;
        if(grade.length !== 0){
            xhtml = classes.map((lop, index) => {
                
                if(grade[index] !== null){
                    sum += (+grade[index]) * (+lop.Course_Number_Of_Learning_Unit)
                    tc += +lop.Course_Number_Of_Learning_Unit

                    //console.log(grade[index])
                }
                return(
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{lop.Course_ID}</td>
                        <td>{lop.Course_Name}</td>
                        <td>{grade[index] ? grade[index] / 10 : ''}</td>
                    </tr>
                )
            })
            xhtml.push(
                <tr key={-1}>
                    <td></td>
                    <td></td>
                    <td>Average</td>
                    <td>{tc !== 0 && Math.round((sum/tc) * 100)/100 /10}</td>
                </tr>
            )
        }
        console.log(tc, sum)
        return xhtml
    }
    
    render() {
        return (
            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Grade of Student ID {this.props.id}</h4>
                        </div>
                        <div className="modal-body">
                            <table style={{marginBottom : "0px", border: "none"}} className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Course ID</th>
                                        <th>Course Name</th>
                                        <th>Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderGrade(this.props.grade, this.props.class)}
                                </tbody>
                            </table>
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal"> OK </button>
                        </div>
                    </div>

                </div>
            </div>
            
            
        )
    }
}


export default (Modal)
