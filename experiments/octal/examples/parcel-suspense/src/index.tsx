import React, { Component } from "react";
import { Autograph, AutographProvider } from '../../../src/index'

// import { View, Text, StyleSheet } from "react-native-web";
// import ExchangeRateList from "./list";

// import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native-web";
// import { Query } from "react-apollo";
// import gql from "graphql-tag";
import numeral from "numeral";

// import { fontSize, colors } from "./styles";

import * as GQL from './schema'



// import { colors, fontSize } from "./styles";
export const colors = {
    darkBlue: "#2E3B4B",
    white: "#f0f2f5",
    grey: "#dee3e8",
    teal: "#287b97"
  };
  
  export const fontSize = {
    large: "6em",
    medium: "4em",
    small: "2em"
  };
  




const ListStyles = StyleSheet.create({
    container: {
      width: "100%",
      padding: 20
    },
    currencyWrapper: {
      padding: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: colors.teal
    },
    currency: {
      fontSize: fontSize.medium,
      fontWeight: "100",
      color: colors.grey,
      letterSpacing: 4
    }
  });



// const ExchangeRateQuery = gql`
//   query rates($currency: String!) {
//     rates(currency: $currency) {
//       currency
//       rate
//     }
//   }
// `;


const ExchangeRateList = ({ currency: currentCurrency, onCurrencyChange }) => (
    <Autograph>
    {(Query: GQL.Query) => {
      if (Query.__loading) return <ActivityIndicator color={colors.teal} />;
      if (Query.__error) return <Text>{`Error: ${Query.__error}`}</Text>;
      
      return (
        <View style={ListStyles.container}>
          {Query.rates({ currency: currentCurrency })
            .filter(
              ({ currency }) =>
                currency !== currentCurrency &&
                ["USD", "BTC", "LTC", "EUR", "JPY", "ETH"].includes(currency)
            )
            .map(({ currency, rate }, idx, rateArr) => (
              <TouchableOpacity
                accessibilityRole="button"
                onPress={() => onCurrencyChange(currency)}
                style={[
                  ListStyles.currencyWrapper,
                  idx === rateArr.length - 1 && { borderBottomWidth: 0 }
                ]}
                key={currency}
              >
                <Text style={ListStyles.currency}>{currency}</Text>
                <Text style={ListStyles.currency}>
                  {+rate > 1 ? numeral(rate).format("0,0.00") : rate}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      );
    }}
    </Autograph>
);


  const ViewStyles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1
    },
    heading: {
      fontSize: fontSize.large,
      fontWeight: "200",
      color: colors.white,
      letterSpacing: 6
    }
  });
  
export default class ExchangeRateView extends Component {
  state = {
    currency: "USD"
  };

  onCurrencyChange = currency => this.setState(() => ({ currency }));

  render() {
    const { currency } = this.state;

    return (
      <View style={ViewStyles.container}>
        <Text style={ViewStyles.heading}>{`1 ${this.state.currency}`}</Text>
        <ExchangeRateList
          currency={currency}
          onCurrencyChange={this.onCurrencyChange}
        />
      </View>
    );
  }
}



// import * as React from 'react'
import * as ReactDOM from 'react-dom'

// // import * as GQL from './schemas/ethereum'
// import { Autograph, AutographProvider } from '../../../src/index'
// const Suspense = (React as any).Suspense
// const ConcurrentMode = (React as any).unstable_ConcurrentMode

    
// function App({ Query } : { Query: any }){
//     // if(Query.__loading){
//     //     return <div>jasdoifjaiosdjfoijasfd</div>
//     // }
//     let block = Query.block({ number: 5450945 })
//     return <fieldset>
//         <legend>Block {block.hash}</legend>
//         <table><tbody>
//             <tr><td><b>Miner</b></td><td>{block.miner.address}</td></tr>
//             <tr><td><b>Number</b></td><td>{block.number}</td></tr>
            
//         </tbody></table>
//         {block.transactions({ filter: { withInput: false }}).map(tx => <fieldset key={tx.hash}>
//             <legend>{tx.index}: {tx.hash}</legend>
//             <table><tbody>
//                 <tr><td><b>From</b></td><td>{tx.from.address}</td></tr>
//                 <tr><td><b>To</b></td><td>{tx.to.address}</td></tr>

//             </tbody></table>
//         </fieldset>)}
//     </fieldset>
// }



const MainStyles = StyleSheet.create({
    container: {
      height: "100vh",
      backgroundColor: colors.darkBlue
    }
  });

ReactDOM.render(<AutographProvider config="https://w5xlvm3vzz.lp.gql.zone/graphql">
    <View id="root" style={MainStyles.container}>
      <ExchangeRateView />
    </View>
</AutographProvider>, document.getElementById('root'))