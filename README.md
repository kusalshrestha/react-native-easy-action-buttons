# React Native Easy Action Buttons 🚀

Easy switchable actions buttons in react native.

## Installation

```
npm install --save react-native-easy-action-buttons
```
```
yarn add react-native-easy-action-buttons
```

## Usage
```js
import EasyActionButton from 'react-native-easy-action-buttons';

const actionButtons = [
  { type: 'type1', title: 'Title 1', initials: 'A' },
  { type: 'type2', title: 'Title 2', initials: 'B' },
  { type: 'type3', title: 'Title 3', initials: 'C' },
  { type: 'type4', title: 'Title 4', initials: 'D' }
]

render() {
  return (
    <View style={styles.mainContainer}>
      <EasyActionButton buttons={actionButtons} mainIndex={1} onChange={this.onChange} />
    </View>
  )
}
```

## Properties

| Prop | Type | Description |
|---|---|---|
|**`buttons`**|`Array(Object)`|Major data source.|
|**`mainIndex`**|`Number`|Index of the item to begin with default.|
|**`onChange`**|`function`|Callback that is called when the user taps a button.|

## License

MIT