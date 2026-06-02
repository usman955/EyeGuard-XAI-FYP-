import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from '../../utils/theme';
import { Send, Bot, User, Info } from 'lucide-react-native';

const ChatScreen = ({ route }) => {
  const topic = route?.params?.topic || 'education';
  
  const getInitialMessage = () => {
    if (topic === 'clinical_review') {
      return "Hello Doctor. I'm ready to discuss the recent XAI findings. What specific details would you like to review regarding the microaneurysms or Grad-CAM heatmap?";
    } else if (topic === 'analysis') {
      return "Hi there! I can explain how our AI algorithms work alongside doctors to detect retinal issues early. What would you like to know?";
    }
    return "Hello! I'm your EyeGuard Medical AI Assistant. How can I help you understand retinal health today?";
  };

  const [messages, setMessages] = useState([
    { id: '1', text: getInitialMessage(), sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef();

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const botMsg = { 
        id: (Date.now() + 1).toString(), 
        text: "That's a great question. Regular screening is essential because many retinal diseases like Diabetic Retinopathy or Glaucoma don't show symptoms in their early stages. Early detection via AI can prevent severe vision loss.", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const getSuggestedPrompts = () => {
    if (topic === 'clinical_review') {
      return [
        "Explain the Grad-CAM focus area",
        "What is the confidence score based on?",
        "Are there any signs of Glaucoma?"
      ];
    } else if (topic === 'analysis') {
      return [
        "How does the AI detect Diabetic Retinopathy?",
        "Is the AI more accurate than a human?",
        "What are hard exudates?"
      ];
    }
    return [
      "What is Diabetic Retinopathy?",
      "How often should I get screened?",
      "What are signs of Glaucoma?"
    ];
  };

  const suggestedPrompts = getSuggestedPrompts();

  const handlePromptClick = (text) => {
    setInputText(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Medical Assistant</Text>
      </View>

      <View style={styles.disclaimerContainer}>
        <Info color={theme.colors.primaryDark} size={16} />
        <Text style={styles.disclaimerText}>
          This system is intended for screening and educational awareness only and is not a replacement for professional medical diagnosis.
        </Text>
      </View>

      <ScrollView 
        style={styles.chatArea}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map(msg => (
          <View key={msg.id} style={[styles.messageBubbleWrapper, msg.sender === 'user' ? styles.wrapperRight : styles.wrapperLeft]}>
            {msg.sender === 'bot' && (
              <View style={styles.avatarBot}>
                <Bot color="#fff" size={16} />
              </View>
            )}
            
            <View style={[styles.messageBubble, msg.sender === 'user' ? styles.bubbleUser : styles.bubbleBot]}>
              <Text style={[styles.messageText, msg.sender === 'user' ? styles.textUser : styles.textBot]}>
                {msg.text}
              </Text>
            </View>

            {msg.sender === 'user' && (
              <View style={styles.avatarUser}>
                <User color="#fff" size={16} />
              </View>
            )}
          </View>
        ))}
        
        {messages.length === 1 && (
          <View style={styles.promptsContainer}>
            <Text style={styles.promptsLabel}>Suggested questions:</Text>
            {suggestedPrompts.map((prompt, idx) => (
              <TouchableOpacity key={idx} style={styles.promptChip} onPress={() => handlePromptClick(prompt)}>
                <Text style={styles.promptText}>{prompt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Ask a medical question..."
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]} 
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Send color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  disclaimerContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primaryLight,
    padding: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    alignItems: 'flex-start',
  },
  disclaimerText: {
    fontSize: 12,
    color: theme.colors.primaryDark,
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
  chatArea: {
    flex: 1,
    padding: theme.spacing.m,
  },
  messageBubbleWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: theme.spacing.m,
  },
  wrapperLeft: {
    justifyContent: 'flex-start',
    paddingRight: '20%',
  },
  wrapperRight: {
    justifyContent: 'flex-end',
    paddingLeft: '20%',
  },
  avatarBot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarUser: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  messageBubble: {
    padding: theme.spacing.m,
    borderRadius: 16,
  },
  bubbleBot: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  bubbleUser: {
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  textBot: {
    color: theme.colors.text,
  },
  textUser: {
    color: '#fff',
  },
  promptsContainer: {
    marginTop: theme.spacing.l,
    paddingLeft: 36,
  },
  promptsLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  promptChip: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: theme.colors.primaryLight,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  promptText: {
    color: theme.colors.primaryDark,
    fontSize: 13,
    fontWeight: '500',
  },
  inputArea: {
    flexDirection: 'row',
    padding: theme.spacing.m,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    minHeight: 44,
    maxHeight: 120,
    fontSize: 15,
    color: theme.colors.text,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  sendBtnDisabled: {
    backgroundColor: theme.colors.border,
  }
});

export default ChatScreen;
