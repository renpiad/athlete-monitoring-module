import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const ACTION_WIDTH = 80; // Width of each action button

const SwipeableRow = ({ children, onEdit, onDelete }) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === 4) {
      const { translationX } = event.nativeEvent;

      // If swiped left enough to reveal actions
      if (translationX < -ACTION_WIDTH / 2) {
        Animated.spring(translateX, {
          toValue: -ACTION_WIDTH * 2,
          useNativeDriver: true,
          bounciness: 0,
        }).start();
      } else {
        // Reset position if not swiped far enough
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const resetPosition = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  // Calculate opacity and scale for edit button
  const editOpacity = translateX.interpolate({
    inputRange: [-ACTION_WIDTH * 2, -ACTION_WIDTH, 0],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  });

  // Calculate opacity and scale for delete button
  const deleteOpacity = translateX.interpolate({
    inputRange: [-ACTION_WIDTH * 2, -ACTION_WIDTH * 1.5, -ACTION_WIDTH],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.actionsContainer, { right: 0 }]}>
        <Animated.View
          style={[
            styles.actionButton,
            styles.editButton,
            { opacity: editOpacity },
          ]}
        >
          <TouchableOpacity
            style={styles.actionButtonInner}
            onPress={() => {
              resetPosition();
              onEdit && onEdit();
            }}
          >
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.actionButton,
            styles.deleteButton,
            { opacity: deleteOpacity },
          ]}
        >
          <TouchableOpacity
            style={styles.actionButtonInner}
            onPress={() => {
              resetPosition();
              onDelete && onDelete();
            }}
          >
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.rowContent,
            { transform: [{ translateX: translateX }] },
          ]}
        >
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    overflow: "hidden",
  },
  rowContent: {
    backgroundColor: "#ffffff",
  },
  actionsContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    flexDirection: "row",
    width: ACTION_WIDTH * 2,
  },
  actionButton: {
    width: ACTION_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonInner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#2196F3", // Blue
  },
  deleteButton: {
    backgroundColor: "#F44336", // Red
  },
  actionText: {
    color: "#fff",
    fontSize: 18,
    backgroundColor: "transparent",
  },
});

export default SwipeableRow;
