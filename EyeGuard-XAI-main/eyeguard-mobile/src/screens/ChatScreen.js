/**
 * ============================================================================
 * File: ChatScreen.js
 * Location: screens
 * Purpose: Main user interface screen/view for the EyeGuard-XAI Mobile Application.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Send, Bot, User } from 'lucide-react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const OPENROUTER_API_KEY = ''; // Add your OpenRouter API Key here

const ChatScreen = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { text: "Hello! I'm EyeGuard AI. How can I help you with your retinal health today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
        model: "google/gemini-2.0-flash-exp:free",
        messages: [
          {
            role: "system",
            content: user?.role === 'doctor' 
              ? "You are an advanced Explainable AI (XAI) medical assistant for ophthalmologists. Provide high-level, professional clinical insights on retinal diseases like Diabetic Retinopathy, Glaucoma, and AMD. Use precise medical terminology. When discussing AI predictions, explain the pathological features (e.g., microaneurysms, exudates) that contributed to the decision to support clinical verification. Keep responses concise, analytical, and formatted with markdown."
              : "You are EyeGuard AI, a friendly and empathetic educational assistant for general users. Explain retinal health, symptoms, and eye care simply and clearly without using confusing medical jargon. Focus on general wellness, early detection awareness, and healthy habits. Always remind the user that you are an AI and they should consult a human doctor for a real diagnosis. Keep responses warm, easy to understand, and formatted with markdown."
          },
          ...messages.map(m => ({
            role: m.isBot ? "assistant" : "user",
            content: m.text
          })),
          { role: "user", content: input }
        ]
      }, {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      });

      const botText = response.data.choices[0]?.message?.content || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { text: botText, isBot: true }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { text: "Connection error. Please try again later.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      style={styles.container}
    >
      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatArea}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        contentContainerStyle={{ padding: 16 }}
      >
        {messages.map((msg, i) => (
          <View key={i} style={[styles.messageWrapper, msg.isBot ? styles.botWrapper : styles.userWrapper]}>
            {msg.isBot && <Bot size={20} color="#5D1F1A" style={{ marginBottom: 4 }} />}
            <View style={[styles.bubble, msg.isBot ? styles.botBubble : styles.userBubble]}>
              <Text style={[styles.messageText, msg.isBot ? styles.botText : styles.userText]}>{msg.text}</Text>
            </View>
          </View>
        ))}
        {isLoading && (
          <ActivityIndicator color="#5D1F1A" style={{ alignSelf: 'flex-start', marginLeft: 20 }} />
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask anything..."
          value={input}
          onChangeText={setInput}
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend} disabled={isLoading}>
          <Send color="#fff" size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatArea: {
    flex: 1,
  },
  messageWrapper: {
    marginBottom: 16,
    maxWidth: '85%',
  },
  botWrapper: {
    alignSelf: 'flex-start',
  },
  userWrapper: {
    alignSelf: 'flex-end',
  },
  bubble: {
    padding: 14,
    borderRadius: 20,
  },
  botBubble: {
    backgroundColor: '#f1f5f9',
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#5D1F1A',
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  botText: {
    color: '#1e293b',
  },
  userText: {
    color: '#fff',
  },
  inputContainer: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
    marginRight: 8,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#5D1F1A',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ChatScreen;
