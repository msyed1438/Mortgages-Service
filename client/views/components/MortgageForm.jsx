import React from 'react';
// import Chart from './Chart.jsx';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import CountUp from 'react-countup';
import Piechart from './Piechart.jsx';
import inputController from '../../../controller/handleInputChange.js';

const axios = require('axios');

export default class MortgageForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            path: window.location.pathname,
            mortgageFields : {
                homePrice: 100000,
                downPayment: 20000,
                downPaymentPerc: 20,
                loanProgram: 30,
                interestRate: 4,
                propertyTax: 800,
                propertyTaxPerc: 1,
                homeInsurance: 12600,
                hoaDues: 296
            }
        }
        // (mortgageFields.homePrice * downPaymentPerc)
        // (mortgageFields.homePrice * propertyTaxPerc)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.returnState = this.returnState.bind(this);
    }

    componentDidMount() {
        var that = this;
        var url;
        var endpoint = this.state.path === '/' ? 1 : this.state.path; 

        //for development
        // if ( endpoint === 1 ) {
        //     url = 'http://localhost:3008/api/price'
        // } else {
        //     url = `http://localhost:3008/api/price${this.state.path}`;
            
        // }
        // for deployment
        if ( endpoint === 1 ) {
            url = 'http://54.162.252.75:3008/api/price'
        } else {
            url = `http://54.162.252.75:3008/api/price${this.state.path}`;
        }


        axios.get(url).then(function(response) {

            var hpfields = inputController.calculateFieldsHomePrice(response.data.price, that);
            console.log('inputController: ', inputController);
        
            that.setState({
                mortgageFields : {
                    homePrice: response.data.price,
                    downPayment: hpfields.downPayment,
                    downPaymentPerc: that.state.mortgageFields.downPaymentPerc,
                    loanProgram: that.state.mortgageFields.loanProgram,
                    interestRate: that.state.mortgageFields.interestRate,
                    propertyTax: hpfields.propertyTax,
                    propertyTaxPerc: that.state.mortgageFields.propertyTaxPerc,
                    homeInsurance: that.state.mortgageFields.homeInsurance,
                    hoaDues: that.state.mortgageFields.hoaDues
                }
            })
        }).catch((err)=>console.error('componentDidMount',err));
    }

    returnState() {

        var updatedState = {
            homePrice: this.state.mortgageFields.homePrice,
            downPayment: this.state.mortgageFields.downPayment,
            downPaymentPerc: this.state.mortgageFields.downPaymentPerc,
            loanProgram: this.state.mortgageFields.loanProgram,
            interestRate: this.state.mortgageFields.interestRate,
            propertyTax: this.state.mortgageFields.propertyTax,
            propertyTaxPerc: this.state.mortgageFields.propertyTaxPerc,
            homeInsurance: this.state.mortgageFields.homeInsurance,
            hoaDues: this.state.mortgageFields.hoaDues
        }

        return updatedState;
    }

    handleInputChange(e) {
        e.preventDefault();
        inputController.handleInputChange(e, this)
    }


    // calculateFieldsLoanProgram(program) {
    //     let obj = {};

    //     if ( program === '30-year fixed' ) {
    //         obj.interestRate = 4.00;
    //     } else if ( program === '15-year fixed' ) {
    //         obj.interestRate = 4.50;
    //     } else if ( program === '5/1 ARM' ) {
    //         obj.interestRate = 4.0;
    //     }

    //     return obj;
    // }

    render() {

        var dataResults = inputController.calculateMonthlyPayment(this);
               
        
        var width = 400,
            height = 400,
            radius = Math.min(width, height) / 2;
            
        return (
            <div className="layoutBrett">
                <h1>Mortgage Calculator</h1>
                <br></br>
                <p>Use our home loan calculator to estimate your mortgage payment, with taxes and insurance. Simply enter the price of the home, your down payment, and details about the home loan to calculate your mortgage payment breakdown, schedule, and more.</p>
                <br></br><br></br>
                

                <form className="col-25 formBrett">
                    <div className="form-field-Brett">
                        <label className="fieldLabel">Home price</label>
                        <div className="input-overlay_left inputs-homePrice">
                            <div className="zsg-input-overlay-text_left">$</div>
                            <input name="handleHomePrice" autoComplete="off" className="inputBrett" onChange={this.handleInputChange} type="tel" value={this.state.mortgageFields.homePrice}/>
                        </div>

                        {/* <p class="zsg-form-error-text">Invalid home price</p> */}
                    </div>
                    <div>
                        <br></br>
                        <label className="fieldLabel">Down payment</label>                        
                    </div>
                        <input autoComplete="off" className="inputBrett" type="tel" name="handleDownPaymentChange" onChange={this.handleInputChange} value={this.state.mortgageFields.downPayment}/>
                        <input name="handleDownPaymentPerChange" autoComplete="off" className="inputBrett" onChange={this.handleInputChange} type="tel" value={this.state.mortgageFields.downPaymentPerc} />
                        
                    <div>
                        <br></br>
                        <label className="fieldLabel">Loan Program</label>
                    </div>
                        
                        <select name="handleLoanProgramChange" onChange={this.handleInputChange} >
                            <option className="inputBrett" >30-year fixed</option>
                            <option className="inputBrett" >15-year fixed</option>
                            <option className="inputBrett" >5/1 ARM</option>
                        </select>

                    <div>
                        <br></br><br></br>
                        {/* <a href="https://www.zillow.com/mortgage-rates/?value=1522429&amp;down=304486&amp;auto=true&amp;source=Z_Mortgage_Calc_rates" target="_blank" rel="nofollow">See current rates</a> */}
                        <label className="fieldLabel">Interest rate</label>
                    </div>
                        <input name="handleInterestRateChange" autoComplete="off" className="inputBrett" type="tel" value={this.state.mortgageFields.interestRate} onChange={this.handleInputChange}/>
                    <div>
                    <br></br><br></br>
                        <label className="fieldLabel">Property tax</label>
                    </div>
                        <input name="handlePropertyTaxChange" autoComplete="off" className="inputBrett" type="tel" value={this.state.mortgageFields.propertyTax} onChange={this.handleInputChange} />
                        <input name="handlePropertyTaxPercChange" autoComplete="off" className="inputBrett" onChange={this.handleInputChange} type="tel" value={this.state.mortgageFields.propertyTaxPerc} />
                    <div>
                        <br></br>
                        <label className="fieldLabel">Home Insurance</label>
                    </div>
                        <input autoComplete="off" className="inputBrett" type="tel" defaultValue={this.state.mortgageFields.homeInsurance} />
                    <div>
                        <br></br>
                        <label className="fieldLabel">HOA dues</label>
                    </div>
                        <input autoComplete="off" className="inputBrett" type="tel" defaultValue={this.state.mortgageFields.hoaDues} />
                </form>
                <div className="col-75" id="donut">
                <p className="countLabelBrett">Your payment</p>
                    <CountUp
                        start={0}
                        end={dataResults.TOTALPAYMENT}
                        duration={1}
                        separator=","
                        decimal=","
                        prefix="$"
                        className="countUpBrett"
                    >
                    </CountUp>
                    <ReactMinimalPieChart
                        data={[
                            {
                            title: 'P & I',
                            value: dataResults.MONTHLYPI,
                            color: '#1274e4'
                            },
                            {
                            title: 'taxes',
                            value: dataResults.PROPERTYTAX,
                            color: '#62aef7'
                            },
                            {
                            title: 'insurance',
                            value: dataResults.HOMEINSURANCE,
                            color: '#3390e9'
                            }
                        ]}
                        style= {{height: '400px'}}
                        animate 
                        lineWidth={15} 
                        label 
                        labelStyle={{
                            fontSize: '5px', 
                            fontFamily: 'sans-serif'
                        }} 
                        radius={35} 
                        labelPosition={112}
                    />
                    
                    
                </div>
                <svg viewBox="0 225 600 450">
                    <Piechart x={width} y={height} outerRadius={radius * 0.5} innerRadius={radius * 0.4}
                        data={[
                            {label: 'P & I', value: dataResults.MONTHLYPI},
                            {label: 'Taxes', value: dataResults.PROPERTYTAX},
                            {label: 'Insurance', value: dataResults.HOMEINSURANCE}
                        ]} />

                </svg>
            </div>
        );
    }

}
