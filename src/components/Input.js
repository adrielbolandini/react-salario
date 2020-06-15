import React, { Component } from 'react';
import '../styles.css';
import Bar from './Bar';


export default class Input extends Component {

    constructor(){
        super();
        this.state={
        brute: 0,
        inssvalue: 0,
        irvalue: 0,
        liquid: 0,
        baseir:0,
        irpercent:0,
        liquidpercent:0,
        insspercent: 0
        };
    };

    calc=(current)=>{
        current= parseFloat(current);
        let {irvalue,inssvalue, liquid,insspercent,liquidpercent,irpercent} = 0;
        let brute = current;
        let insstaxes={
            taxe1: 0.075,
            max1: 1045,
            taxe2: 0.09,
            max2: 2089.6,
            taxe3: 0.12,
            max3: 3134.4,
            taxe4: 0.14,
            max4: 6101.06
        };
        let irtaxes={
            taxe1: 0,
            taxe2: 0.075,
            taxe3: 0.15,
            taxe4: 0.225,
            taxe5: 0.275,
            deduction1:0,
            deduction2:142.8,
            deduction3:354.8,
            deduction4:636.13,
            deduction5:869.36
        };

        this.setState({brute: current.toFixed(2)});

        (current === insstaxes.max1) ? inssvalue=current*insstaxes.taxe1:
        (current > insstaxes.max1 && current <= insstaxes.max2) ? inssvalue= (current-insstaxes.max1)*(insstaxes.taxe2)+insstaxes.max1*insstaxes.taxe1:
        (current >insstaxes.max2 && current <= insstaxes.max3) ? inssvalue= (current-insstaxes.max2)*(insstaxes.taxe3)+insstaxes.max1*insstaxes.taxe1+(insstaxes.max2-insstaxes.max1)*(insstaxes.taxe2):
        (current > insstaxes.max3 && current <= insstaxes.max4) ? inssvalue= (current-insstaxes.max3)*(insstaxes.taxe4)+insstaxes.max1*insstaxes.taxe1+(insstaxes.max2-insstaxes.max1)*(insstaxes.taxe2)+(insstaxes.max3-insstaxes.max2)*(insstaxes.taxe3):
        (current >insstaxes.max4) ? inssvalue = 713.10:
        inssvalue = 0;
        inssvalue=inssvalue.toFixed(2);

        insspercent = (inssvalue/brute*100).toFixed(2);
        this.setState({inssvalue: `${inssvalue}     ${insspercent}%`});

        current=(current-inssvalue).toFixed(2);
        this.setState({baseir: current});
        (current<=1903.98) ? irvalue=irtaxes.taxe1-irtaxes.deduction1 : 
        (current>1903.98 && current<=2826.65) ? irvalue=current*irtaxes.taxe2-irtaxes.deduction2:
        (current>2826.65 && current <= 3751.05) ? irvalue=current*irtaxes.taxe3-irtaxes.deduction3:
        (current>3751.05 && current <=4664.68) ? irvalue=current*irtaxes.taxe4-irtaxes.deduction4:
        irvalue=current*irtaxes.taxe5-irtaxes.deduction5;
        irvalue=irvalue.toFixed(2);

        irpercent = (irvalue/brute*100).toFixed(2);
        this.setState({irvalue: `${irvalue}     ${irpercent}%`});

        liquid = (brute-irvalue-inssvalue).toFixed(2);
        liquidpercent = (liquid/brute*100).toFixed(2);
        this.setState({
            liquidpercent: liquidpercent,
            irpercent: irpercent,
            insspercent: insspercent
        });
        return this.setState({liquid: `${liquid}    ${liquidpercent}%`});

    }

    render() {
        const {inssvalue, liquid, irvalue,brute, baseir,irpercent,liquidpercent,insspercent} = this.state;
        return (
            <div>
                <span className='brute'>Salário Bruto</span>
                <input className='brute' onChange={(e)=>this.calc(e.target.value)} />
                <div>
                    <span >Base INSS</span>
                    <input  disabled value={brute}/>
                </div>
                <div>
                    <span >Desconto INSS</span>
                    <input  disabled value={inssvalue}/>
                </div>
                <div>
                    <span >Base IPRF</span>
                    <input  disabled value={baseir}/>
                </div>
                <div>
                    <span >Desconto IPRF</span>
                    <input  disabled value={irvalue}/>
                </div>
                <span className='brute'>Salário Líquido</span>
                <input  className='brute' disabled value={liquid} style={{marginBottom: "25px"}}/>
                <Bar percent={liquidpercent} color="#26d217"/>
                <Bar percent={insspercent} color="#df5320"/>
                <Bar percent= {irpercent} color="#d72c23"/>
            </div>
        )
    }
}
