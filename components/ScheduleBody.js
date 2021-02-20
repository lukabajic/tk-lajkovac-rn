import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { TitleTwo, Headline, Subheadline } from "../components/Typography";
import Colors from "../utils/colors";

const ScheduleTime = ({ item }) => {
  const { taken, start, end } = item;

  const scheduleTimeStyles = [styles.scheduleTime];
  taken && scheduleTimeStyles.push(styles.scheduleTimeTaken);
  const scheduleTimeBeforeStyles = [styles.scheduleTimeBefore];
  taken && scheduleTimeBeforeStyles.push(styles.scheduleTimeBeforeTaken);

  return (
    <Pressable style={scheduleTimeStyles}>
      <View style={scheduleTimeBeforeStyles} />
      <Headline style={{ color: Colors.darkGray }}>
        {taken ? "Zuazet termin" : "Slobodan termin"}
      </Headline>
      <View style={styles.scheduleWhen}>
        <Subheadline
          style={{ color: Colors.darkGray, fontVariant: ["tabular-nums"] }}
        >
          {start.slice(0, 2) + "." + start.slice(2, 4)}
        </Subheadline>
        <Subheadline
          style={{ color: Colors.gray, fontVariant: ["tabular-nums"] }}
        >
          {end.slice(0, 2) + "." + end.slice(2, 4)}
        </Subheadline>
      </View>
    </Pressable>
  );
};

const ScheduleCourt = ({ item, onNext, onPrev, isSliding }) => {
  const { number, times } = item;

  return (
    <View style={styles.court}>
      <View style={styles.courtHeader}>
        {!isSliding && (
          <TouchableOpacity onPress={onPrev} disabled={number < 2}>
            <Ionicons
              size={24}
              name="chevron-back"
              color={number > 1 ? Colors.Black : Colors.gray}
            />
          </TouchableOpacity>
        )}
        <TitleTwo style={{ color: Colors.black, textAlign: "center", flex: 1 }}>
          {" "}
          Teren br. {number}
        </TitleTwo>
        {!isSliding && (
          <TouchableOpacity onPress={onNext} disabled={number > 2}>
            <Ionicons
              size={24}
              name="chevron-forward"
              color={number < 3 ? Colors.Black : Colors.gray}
            />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        style={styles.scheduleTimes}
        data={times}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => <ScheduleTime item={item} />}
      />
    </View>
  );
};

class ScheduleBody extends Component {
  state = {
    isSliding: false,
  };

  render() {
    const { schedule } = this.props;
    const { isSliding } = this.state;
    const windowWidth = Dimensions.get("window").width;

    return (
      <Carousel
        ref={(c) => {
          this._carousel = c;
        }}
        data={schedule?.courts?.sort((a, b) => a.number > b.number)}
        itemWidth={windowWidth - 32}
        sliderWidth={windowWidth - 32}
        onBeforeSnapToItem={() => this.setState({ isSliding: true })}
        onSnapToItem={() => this.setState({ isSliding: false })}
        renderItem={({ item }) => (
          <ScheduleCourt
            isSliding={isSliding}
            item={item}
            onNext={() => this._carousel.snapToNext()}
            onPrev={() => this._carousel.snapToPrev()}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  court: {
    flex: 1,
    paddingVertical: 16,
  },
  courtHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  scheduleTime: {
    position: "relative",
    height: 64,
    width: "100%",
    paddingLeft: 28,
    paddingRight: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: Colors.white,
    borderColor: "rgba(38,35,34, 0.2)",
    borderWidth: 1,
  },
  scheduleTimeTaken: {
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  scheduleTimeBefore: {
    position: "absolute",
    height: 64,
    width: 12,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: Colors.primary,
  },
  scheduleTimeBeforeTaken: {
    backgroundColor: Colors.orange,
  },
});

export default ScheduleBody;
