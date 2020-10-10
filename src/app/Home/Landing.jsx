import React, { Component } from "react"
import { withLocalize } from "react-localize-redux"
import { withRouter } from 'react-router-dom'
import DataTable from 'react-data-table-component'


class Landing extends Component {

    constructor(props) {
		super(props);

		this.state = {
			baseCurrency:'SEK',
			convertToCurrency: 'USD',
			convertToCurrencyGBP: 'GBP',
			convertToCurrencySGD: 'SGD',
			convertToCurrencyOthers: 'AUD',
			baseAmount: 200,
			rates: [],
			currencies: [],
			historicData: [],

			// table state objects..
			tableTextMessage:'Fetching Historic Data',
			rowsPerPage: 10,
			sortBy: "id",
			sortOrder: "desc",
			totalJobs: 0,
		};
		
		this.callExchangeRateAPI = this.callExchangeRateAPI.bind(this);
		this.changeBaseCurrency = this.changeBaseCurrency.bind(this);
		this.changeConvertToCurrency = this.changeConvertToCurrency.bind(this);
		this.changeBaseAmount = this.changeBaseAmount.bind(this);
		this.currencyFormatter = this.currencyFormatter.bind(this);
    } 

    componentDidMount(){
		this.callExchangeRateAPI(this.state.baseCurrency)
		this.callExchangeRateHistoricAPI(this.state.baseCurrency);
	}

	changeBaseCurrency(e) {
		this.setState({ baseCurrency: e.target.value});
		this.callExchangeRateAPI(e.target.value)
	}

	changeConvertToCurrency(e, convertCurrency) {
		console.log('Inside changeConvertToCurrency ', e.target.value)
		
		switch(convertCurrency) {
			case 'USD':
				this.setState({
					convertToCurrency: e.target.value,
				}, () => {
					this.callExchangeRateHistoricAPI(this.state.baseCurrency);
				});
				break;
			case 'GBP':
				this.setState({
					convertToCurrencyGBP: e.target.value,
				}, () => {
					this.callExchangeRateHistoricAPI(this.state.baseCurrency);
				});
				break;
			case 'SGD':
				this.setState({
					convertToCurrencySGD: e.target.value,
				}, () => {
					this.callExchangeRateHistoricAPI(this.state.baseCurrency);
				});
				break;
			case 'OTHERS':
				this.setState({
					convertToCurrencyOthers: e.target.value,
				}, () => {
					this.callExchangeRateHistoricAPI(this.state.baseCurrency);
				});
				break;
			default:
		  }
	}
	  
	changeBaseAmount(e) {
	   this.setState({
		 baseAmount: e.target.value
	   });
	}
	  
	currencyFormatter(baseAmount, selectedCurrency, rates) {
		return Number.parseFloat(baseAmount * rates[selectedCurrency]).toFixed(3);
	}
	
	callExchangeRateAPI(base) {
		const api = `https://api.exchangeratesapi.io/latest?base=${base}`;
		
		fetch(api)
			.then(results => {
				return results.json();
			}).then(data => {
				this.setState({
					rates: data['rates'],
					currencies: Object.keys(data['rates']).sort()
				})
			  }
			);
	}
	  
	  callExchangeRateHistoricAPI(base) {
		
		const { convertToCurrency, convertToCurrencyGBP, convertToCurrencySGD, convertToCurrencyOthers } = this.state;
		const startDate = '2015-03-26';
		const endDate = '2017-06-13';
		const symbols = `${convertToCurrency},${convertToCurrencyGBP},${convertToCurrencySGD},${convertToCurrencyOthers}`;
		const api = `https://api.exchangeratesapi.io/history?base=${base}&symbols=${symbols}&start_at=${startDate}&end_at=${endDate}`;
		
		fetch(api)
			.then(results => {
				return results.json();
			}).then(data => {
				this.setState({
					historicData: Object.values(data['rates']),
				})
			}
			);
	}

    render() {

	const { currencies, rates, baseCurrency, baseAmount, convertToCurrency, convertToCurrencyGBP, convertToCurrencySGD, convertToCurrencyOthers, historicData, rowsPerPage, totalrecords, tableTextMessage} = this.state;
    
    const currencyChoice = currencies.map(currency =>
      <option key={currency} value={currency}> {currency} </option>      
	);
	                               
    const titleView = (
		// Web page Header
		<h3 className='text-center mt-3'>
			Currency Converter
		</h3>
	);
	
	const currencyForm = (
		<div className="form-container">
			<form>
				<div className='container'>
					<div className='row'>
						<div className='col-sm-6 p-0 mt-3'>
							<h4>Currency I have</h4>
							<div>{baseCurrency}</div>
							<select value={baseCurrency}
									onChange={this.changeBaseCurrency}>
									{currencyChoice}
									<option>{baseCurrency}</option>
							</select>
						</div>
						
						<div className='col-sm-6 p-0 mt-3'>
							<div className=''>
								<h4>Currency I want</h4>

								<div className='d-flex justify-content-between'>
									<div className=''>
										<div>{convertToCurrency}</div>
										<select value={convertToCurrency}
												onChange={(e) => this.changeConvertToCurrency(e, 'USD')}>
												{currencyChoice}
										</select>
										{/* <input type='text' defaultValue={convertToCurrency} /></input> */}
									</div>

									<div className=''>
										<div>{convertToCurrencyGBP}</div>
										<select value={convertToCurrencyGBP}
												onChange={(e) => this.changeConvertToCurrency(e, 'GBP')}>
												{currencyChoice}
										</select>
									</div>
									
									<div className=''>
										<div>{convertToCurrencySGD}</div>
										<select value={convertToCurrencySGD}
												onChange={(e) => this.changeConvertToCurrency(e, 'SGD')}>
												{currencyChoice}
										</select>
									</div>

									<div className=''>
										<div>{convertToCurrencyOthers}</div>
										<select  
											value={convertToCurrencyOthers}
											onChange={(e) => this.changeConvertToCurrency(e, 'OTHERS')}>
											{currencyChoice}
										</select>
									</div>

								</div>
							</div>
						</div>
					</div>
						
					<div className='row mt-4'>
						<h3>Amount:</h3>
						<input type='number'
								defaultValue={baseAmount} 
								onChange={this.changeBaseAmount}>
						</input>  
					</div>

					<div className='row mt-4'>
						<div className='font-weight-bold font-italic'>
							{baseAmount} {baseCurrency} is equal to:
							<ul>
								<li>{this.currencyFormatter(baseAmount, convertToCurrency, rates)} {convertToCurrency}</li>
								<li>{this.currencyFormatter(baseAmount, convertToCurrencyGBP, rates)} {convertToCurrencyGBP}</li>
								<li>{this.currencyFormatter(baseAmount, convertToCurrencySGD, rates)} {convertToCurrencySGD}</li>
								<li>{this.currencyFormatter(baseAmount, convertToCurrencyOthers, rates)} {convertToCurrencyOthers}</li>
							</ul>
						</div> 
					</div>
					
				</div>
			</form>                       
			
		</div>
	);

	let columns = [
		{
            name: 'Date',
            selector: 'date',
            sortable: true,
		},
		{
            name: `${convertToCurrency}`,
            selector: `${convertToCurrency}`,
            sortable: true,
		},
		{
            name: `${convertToCurrencyGBP}`,
            selector: `${convertToCurrencyGBP}`,
            sortable: true,
		},
		{
            name: `${convertToCurrencySGD}`,
            selector: `${convertToCurrencySGD}`,
            sortable: true,
		},
		{
            name: `${convertToCurrencyOthers}`,
            selector: `${convertToCurrencyOthers}`,
            sortable: true,
        },
	]

	const historicDataView = (
		<DataTable
			title="Historic Data"
			columns={columns}
			data={historicData}
			pagination={true}
			paginationPerPage={rowsPerPage}
			paginationRowsPerPageOptions= {[5,10, 20, 30, 50, 100]}
			paginationTotalRows={totalrecords}
			onChangePage={this.onChangePage}
			onChangeRowsPerPage={this.onChangeRowsPerPage}
			noDataComponent={tableTextMessage}
			onSort={this.onSort}
			highlightOnHover
			className='mt-3'
		/>
  	);

    const landingView = (
      <div className='container'>
		  {titleView}
		  {currencyForm}
		  {historicDataView}
      </div>
    );
    return (
        <>  
          {landingView}
        </>
    );
  }
}

export default withLocalize(withRouter(Landing));