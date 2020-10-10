import React, { Component } from "react"
import { withLocalize } from "react-localize-redux"
import { withRouter } from 'react-router-dom'
import DataTable from 'react-data-table-component'

class Landing extends Component {

    constructor(props) {
		super(props);

		// initilize state objects
		this.state = {
			baseCurrency:'SEK',
			convertToCurrencyUSD: 'USD',
			convertToCurrencyGBP: 'GBP',
			convertToCurrencySGD: 'SGD',
			baseAmount: 200,
			rates: [],
			currencies: [],
			historicData: [],

			// table state objects..
			tableTextMessage:'Fetching Historic Data',
			rowsPerPage: 10,
			sortBy: "date",
			sortOrder: "desc",
		};
		
		//bind all app function methids.
		this.callExchangeRateAPI = this.callExchangeRateAPI.bind(this);
		this.callExchangeRateHistoricAPI = this.callExchangeRateHistoricAPI.bind(this);

		this.changeBaseCurrency = this.changeBaseCurrency.bind(this);
		this.changeConvertToCurrency = this.changeConvertToCurrency.bind(this);
		this.changeBaseAmount = this.changeBaseAmount.bind(this);
		this.currencyFormatter = this.currencyFormatter.bind(this);
    } 

	//lifecycle method when component is first loaded each time
    componentDidMount(){
		this.callExchangeRateAPI(this.state.baseCurrency)
		this.callExchangeRateHistoricAPI(this.state.baseCurrency);
	}

	// method to change the base currency
	changeBaseCurrency(e) {
		this.setState({
			baseCurrency: e.target.value
		}, () => {
			this.callExchangeRateAPI(this.state.baseCurrency);
			this.callExchangeRateHistoricAPI(this.state.baseCurrency);
		});
	}

	//currency converter method..
	changeConvertToCurrency(e, convertCurrency) {
		
		switch(convertCurrency) {
			case 'USD':
				this.setState({
					convertToCurrencyUSD: e.target.value,
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
	  
	// currency formatter method.. Returning after type conversions with three fractions after decimals...
	currencyFormatter(baseAmount, selectedCurrency, rates) {
		return Number.parseFloat(baseAmount * rates[selectedCurrency]).toFixed(3);
	}
	
	// fetch call to get currencies and their rates..
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
	  
	// method to get the historic data of currencies exchange rates..
	callExchangeRateHistoricAPI(base) {
	
		const { convertToCurrencyUSD, convertToCurrencyGBP, convertToCurrencySGD } = this.state;
		
		// TO-DO: read these values from date-picker ui component
		const startDate = '2015-03-26';
		const endDate = '2017-06-13';
		const symbols = `${convertToCurrencyUSD},${convertToCurrencyGBP},${convertToCurrencySGD}`;
		const api = `https://api.exchangeratesapi.io/history?base=${base}&symbols=${symbols}&start_at=${startDate}&end_at=${endDate}`;
		
		fetch(api)
			.then(results => {
				return results.json();
			}).then(data => {

				// logic to form the final array as source of data for injection to data table component
				let keysArray = Object.keys(data['rates']);
				let currencies = Object.values(data['rates']);
				
				currencies.map((data, i) => {
					return data['date']= keysArray[i];
				});

				this.setState({
					historicData: currencies,
				});
			}
		);
	}

    render() {

	const { currencies, rates, baseCurrency, baseAmount, convertToCurrencyUSD, convertToCurrencyGBP, convertToCurrencySGD, historicData, rowsPerPage, totalrecords, tableTextMessage} = this.state;
    
    const currencyChoice = currencies.map(currency =>
      <option key={currency} value={currency}> {currency} </option>      
	);
	                               
    const titleView = (
		// Web page Header
		<h3 className='text-center mt-3'>
			Currency Converter
		</h3>
	);
	
	// user intercaction curreny input form..
	const currencyForm = (
		<div>
			<form>
				<div className='container'>

					<div className='row mb-3'>
						<div className='col-sm-6 pt-3 mt-3 white-bg'>
							<h4>Convert From</h4>
							<div>Base Currency</div>
							<input type='number'
								defaultValue={baseAmount} 
								onChange={this.changeBaseAmount}
								className='mr-3'>
							</input>  
							<select value={baseCurrency}
									onChange={this.changeBaseCurrency}>
									{currencyChoice}
									<option>{baseCurrency}</option>
							</select>
						</div>
						
						<div className='col-sm-6 pt-3 mt-3 white-bg'>
							<div className=''>
								<h4>Convert To</h4>

								<div className='d-flex justify-content-between pb-3'>
									<div className='mr-3'>
										<div>Currency 1</div>
										<select value={convertToCurrencyUSD}
												onChange={(e) => this.changeConvertToCurrency(e, 'USD')}>
												{currencyChoice}
										</select>
										<div className='currenct-font-size font-weight-bold mt-2'>{this.currencyFormatter(baseAmount, convertToCurrencyUSD, rates)} {convertToCurrencyUSD}</div>
									</div>

									<div className='mr-3'>
										<div>Currency 2</div>
										<select value={convertToCurrencyGBP}
												onChange={(e) => this.changeConvertToCurrency(e, 'GBP')}>
												{currencyChoice}
										</select>
										<div className='currenct-font-size font-weight-bold mt-2'>{this.currencyFormatter(baseAmount, convertToCurrencyGBP, rates)} {convertToCurrencyGBP}</div>
									</div>
									
									<div className='mr-3'>
										<div>Currency 3</div>
										<select value={convertToCurrencySGD}
												onChange={(e) => this.changeConvertToCurrency(e, 'SGD')}>
												{currencyChoice}
										</select>
										<div className='currenct-font-size font-weight-bold mt-2'>{this.currencyFormatter(baseAmount, convertToCurrencySGD, rates)} {convertToCurrencySGD}</div>
									</div>
								</div>
							</div>
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
            name: `${convertToCurrencyUSD}`,
            selector: `${convertToCurrencyUSD}`,
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
		}
	]

	// tablular data component
	const historicDataView = (
		<DataTable
			title="Historic Data between March 26th, 2015 and June 13th, 2017"
			columns={columns}
			data={historicData}
			pagination={true}
			paginationPerPage={rowsPerPage}
			paginationRowsPerPageOptions= {[5,10, 20, 30, 50, 100]}
			paginationTotalRows={totalrecords}
			noDataComponent={tableTextMessage}
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