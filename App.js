import React from 'react';
import {StyleSheet, View} from 'react-native';


const Box = ({style, ...props}) => <View style={[style, styles.box]} {...props}/>;
const Row = ({children}) => <View style={styles.row}>{children}</View>;

const createArrayOfItems = (numberOfItems) =>
  Array.from(new Array(numberOfItems));

const l = (a) => {
  console.log(a);
  return a;
};
export default class App extends React.Component {
  state = {
    width: 0,
    columns: 7,
    rows: 8,
  };

  updateColor = ({nativeEvent: {layout: {width}}}) => {
    this.setState({width});
  };

  color = (value) =>
    l(`rgba(0, 0, 0, ${value / (this.state.columns * this.state.rows)})`);

  renderBox = (index) =>
    <Box
      key={index}
      style={{height: this.state.width, backgroundColor: this.color(index + 1)}}
      onLayout={index === 0 ? this.updateColor : undefined}/>;

  render() {
    return (
      <View style={styles.container}>
        {
          createArrayOfItems(this.state.rows).map((_, rowIndex) =>
            <Row key={rowIndex}>
              {createArrayOfItems(this.state.columns).map((_, columnIndex) => this.renderBox(columnIndex + this.state.columns * rowIndex))}
            </Row>,
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20, //just for ios
  },
  row: {
    flexDirection: 'row',
    alignContent: 'stretch',
  },
  box: {
    flex: 1,
  },
});
