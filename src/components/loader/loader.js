import React from 'react'
import { View, Container, Content, Spinner} from 'native-base'

class Loader extends React.Component {
  render() {
    return(
      <Container style={styles.wrapper}>
        <View style={{ alignSelf: 'center'}}>
          <Spinner color='#393018' />
        </View>
      </Container>
    )
  }
}

const styles = {
  wrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.27)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
    position: 'absolute',
    width: '100%'
  }
}
export default Loader