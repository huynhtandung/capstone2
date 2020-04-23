import React, { Component } from 'react'
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
  } from "@react-pdf/renderer";

class TextPDF extends Component {
    render() {
        return (
            <Document>
               <Page>
                   <Text>VC</Text>
                   
               </Page>
            </Document>
        )
    }
}


export default  TextPDF
