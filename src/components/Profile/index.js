import React from "react"
import { View, Text, FlatList, TouchableWithoutFeedback, Linking, Share, Alert } from "react-native"
import { connect } from "react-redux"
import { Actions } from "react-native-router-flux"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import I18n from "ex-react-native-i18n"

import Navbar from "../Navbar";
import Button from  "../Button"
import StatusBar from  "../StatusBar"
import Snackbar from '../SnackBar'

import {restoreRecords, setLocale} from "../../store/actions/index"
import { numberWithCommas } from "../../utils"
import showError from "../../utils/showError";
import AnimatedCircularProgress  from '../../utils/AnimatedCircularProgress'

import styles from "./styles"
import NavbarStyles from "../Navbar/styles"

class Profile extends React.Component {
  state = {
    fill: 100,
    linksList: [
      {
        text: I18n.t("change-ayah-page-title"),
        key: 0,
        onClick: () => Actions.change()
      },
      {
        text: I18n.t("demographic-info-link-text"),
        key: 1,
        onClick: () => Actions.demographicForm()
      },
      {
        text: I18n.t("share-tarteel-link-text"),
        key: 2,
        onClick: () => {
          Share.share({
            url: 'http://tarteel.app.link/3NMFNtbiBP',
            title: I18n.t("share-tarteel-post-title"),
          }).then(() => {

          }).catch(e => showError(e.message))
        }
      },
      {
        text: I18n.t("privacy-policy-link-text"),
        key: 3,
        onClick: () => Linking.openURL("https://tarteel.io/privacy")
      },
      {
        text: I18n.t("reset-records-link-text"),
        key: 4,
        onClick: () => {
          Alert.alert(
            I18n.t("restore-records-alert-title"),
            I18n.t("restore-records-alert-text"),
            [
              {text: I18n.t("restore-record-alert-cancel"), style: 'cancel'},
              {text: I18n.t("restore-record-alert-confirm"), onPress: this.handleRestore },
            ],
            { cancelable: true }
          )

        }
      },
      {
        text: I18n.t("change-language-link-text"),
        key: 5,
        onClick: () => {
          Alert.alert(
            I18n.t("change-language-link-text"),
            "",
            [
              {text: "English", onPress: () => this.handleChangeLanguage("en")},
              {text: "العربيه", onPress: () => this.handleChangeLanguage("ar") },
            ],
            { cancelable: true }
          )

        }
      },
      {
        text: I18n.t("contact-us-button-text"),
        key: 6,
        onClick: () => Linking.openURL("mailto:tarteel@abdellatif.io")
      },
    ]
  }
  handleChangeLanguage = (locale) => {
    I18n.locale = (locale) ? locale.replace(/_/, '-') : '';
    this.forceUpdate(() => {
      this.props.dispatch(setLocale(locale))
    })
  }
  handleRestore = () => {
    this.props.dispatch(restoreRecords())
  }
  render() {
    const { linksList } = this.state
    const { ayahsCount } = this.props
    const currentTarget = ayahsCount > 100 ? 1000 : ayahsCount > 1000 ? 10000 : 100
    return (
      <View style={styles.container}>
        <StatusBar />
        <Navbar>
          <View style={NavbarStyles.left} >
            <Button color={"transparent"} Height={35} Width={35} radius={0} onPress={Actions.pop}>
              <View>
                <MaterialCommunityIcons name={"keyboard-backspace"} size={32} color={"#474f59"} />
              </View>
            </Button>
          </View>
          <View >
            <Text style={[NavbarStyles.center, styles.title]}>
              { I18n.t("profile-page-title") }
            </Text>
          </View>
        </Navbar>
        <View style={styles.content}>
          <View style={styles.progressContainer}>
            <AnimatedCircularProgress
              size={120}
              width={3}
              fill={ayahsCount/currentTarget*100}
              rotation={360}
              duration={1000}
              tintColor="#5ec49e"
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#ccc" >
              {
                (fill) => (
                  <View>
                    <Text style={styles.progressText} >
                      { I18n.t("progressbar-ayahs") }
                    </Text>
                    <Text style={styles.ayahsCount}>
                      { String(numberWithCommas((ayahsCount))) }
                    </Text>
                    <Text style={styles.progressNote} >
                      { `/${currentTarget}` }
                    </Text>
                  </View>
                )
              }
            </AnimatedCircularProgress>
          </View>
          <View style={styles.list}>
            <FlatList
              data={linksList}
              renderItem={({item}) => <ListItem item={item} /> }
            />
          </View>
        </View>
      </View>
    )
  }
}

const ListItem = ({ item }) => {
  return (
    <View style={styles.listItem}>
      <TouchableWithoutFeedback onPress={item.onClick} >
        <View>
          <Text style={styles.listItemText}>
            { item.text }
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}


export default connect(
  state => ({
    ayahsCount: state.ayahs.count,
    demographicData: state.demographicData,
    passedOnBoarding: state.data.passedOnBoarding
  })
)(Profile)
