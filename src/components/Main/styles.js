import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window")

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    transform: [
      { translateY: 15 }
    ]
  },
  left: {
    transform: [
      { translateY: 15 }
    ]
  },
  ayahWrapper: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ayahText: {
    textAlign: "center",
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    lineHeight: 30,
    letterSpacing: 2,
    color: "#393e4e",
    fontFamily: "Geeza",
  },
  ayahPositionText: {
    color: "#9fa1a8",
    fontSize: 14,
    letterSpacing: 3,
    fontWeight: "500",
    marginBottom: 0,
  },
  leftIconFigure: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  leftIconFigcaption: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  leftIconImageWrapper: {
    zIndex: 2,
    position: "relative",
    left: 0,
    top: 10
  },
  recordButtonWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  white: {
    color: "#fff"
  },
  recordingButtonsWrapper: {
    flex: 3,
  }
});
