import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import * as Crypto from "expo-crypto";
import {
  MessageType,
  MessageDataType,
  AppContextType,
} from "../../utils/types";
import { AppContext } from "../../constants/Contexts";
const sendIcon = require("../../assets/paper-plane.png");

interface MessageBoxProps {
  onSendMessage: (message: MessageType) => void;
}

const postMessage = async (messageData: MessageDataType) => {
const URL = `http://${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}:${process.env.EXPO_PUBLIC_BACKEND_PORT}/messages`;
  const response = await fetch(URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "same-origin",
    body: JSON.stringify(messageData),
  });
  return response.json();
};

export const MessageBox: React.FC<MessageBoxProps> = ({ onSendMessage }) => {
  const [messageContent, setMessageContent] = useState<string>("");
  const isMounted = useRef(false);
  // TODO: Make sure date(0).getTime() returns a Unix Epoch in seconds
  const [messageData, setMessageData] = useState<MessageDataType>({
    userId: "",
    msgId: "",
    msgContent: "",
    specificLat: "",
    specificLon: "",
    timeSent: new Date(0).getTime()
  });
  const [newMessage, setNewMessage] = useState<MessageType>();
  const keyboardVerticalOffest = Platform.OS === "ios" ? 50 : 0;
  const keyboardBehavior = Platform.OS === "ios" ? "padding" : undefined;
  const inputBoxStyles =
    Platform.OS === "ios"
      ? styles.ios_specific_text
      : styles.android_specific_text;

  useEffect(() => {
    if (isMounted.current) {
      postMessage(messageData)
        .then((data) => {
          if (data) {
            if (newMessage) {
              onSendMessage(newMessage);
            } else {
              console.log("How the fuck did this throw an error");
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      isMounted.current = true;
    }
  }, [messageData]);

  return (
    <AppContext.Consumer>
      {(context: AppContextType) => {
        const onPress = () => {
          if (messageContent === "") {
            console.log("Empty string entered...");
          } else {
            const date = new Date();
            const messageData: MessageDataType = {
              userId: context.user?.userId,
              msgId: Crypto.randomUUID(),
              msgContent: messageContent,
              specificLat: `${context.location?.location?.coords.latitude}`,
              specificLon: `${context.location?.location?.coords.longitude}`,
              timeSent: date.getTime(),
            };

            const newMessage: MessageType = {
              author: String(context.user?.displayName),
              timestamp: date,
              messageContent: messageData.msgContent,
              msgId: messageData.msgId,
            };
            setNewMessage(newMessage);
            setMessageData(messageData);
            setMessageContent("");
          }
        };

        return (
          <KeyboardAvoidingView
            behavior={keyboardBehavior}
            keyboardVerticalOffset={keyboardVerticalOffest}
          >
            <View style={styles.container}>
              <TextInput
                style={inputBoxStyles}
                onChangeText={setMessageContent}
                value={messageContent}
                placeholder="Say Something..."
                placeholderTextColor={"gray"}
                multiline={true}
                maxLength={500}
              />
              <TouchableOpacity style={styles.button} onPress={onPress}>
                <Image source={sendIcon} style={styles.sendIcon} />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        );
      }}
    </AppContext.Consumer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    display: "flex",
    overflow: "hidden", // Ensures inner elements don't overflow rounded corners
    maxWidth: "90%",
    minWidth: "90%",
    justifyContent: "space-between",
    minHeight: 45,
    alignItems: "flex-end",
    paddingLeft: 5,
    marginBottom: 15,
    paddingTop: 15,
  },
  button: {
    backgroundColor: "#3333ff",
    flexDirection: "column",
    borderRadius: 25,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },

  sendIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginRight: 3,
  },
  android_specific_text: {
    backgroundColor: "#F3F2F2",
    padding: 8,
    paddingLeft: 18,
    paddingRight: 18,
    width: "84%",
    borderRadius: 25,
    maxHeight: 200,
    minHeight: 45,
  },

  ios_specific_text: {
    backgroundColor: "#F3F2F2",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 18,
    paddingRight: 18,
    width: "84%",
    borderRadius: 25,
    maxHeight: 200,
    minHeight: 45,
  },
});
