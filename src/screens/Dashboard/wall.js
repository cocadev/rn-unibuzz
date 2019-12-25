import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import WallListItem from '../../components/WallListItem'
import i from '../../common/i'
import { JOBLISTING } from '../../common/staticdata'
import LottieScreen from '../../components/Lottie';
import api from "../../service/api";
import Header from '../../components/Header';
import Cache from "../../utils/cache";

class Wall extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isWaiting: false,
    }
  }

  componentDidMount() {
    this.setState({ isWaiting: true })
    api.getWall(Cache.currentUser.id, (err, res) => {
      if (err == null) {
        console.log('********************* res ************************', res)
        this.setState({posts: res.posts.data, isWaiting:false})
      }
    })
  }

  _renderItem = ({ item }) => (
    <WallListItem item={item} />
  );

  _ItemSeparator = () => <View style={styles.separator} />;

  render() {
    const { isWaiting, posts } = this.state
    return (
      <View style={i.container}>
        <Header />
        {isWaiting && <LottieScreen />}

        <View style={{ flex: 1, marginBottom:10}}>

          <FlatList
            data={posts}
            keyExtractor={(item, i) => String(i)}
            renderItem={this._renderItem}
            numColumns={1}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: 'rgba(0, 0, 0, .08)',
  },
});

export default Wall;