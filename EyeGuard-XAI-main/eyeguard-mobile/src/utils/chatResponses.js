// Mock responses for the educational chatbot

export const getBotResponse = (message, role) => {
  const lowerMsg = message.toLowerCase();
  
  // Greeting
  if (lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('hey')) {
    return role === 'doctor' 
      ? "Hello Doctor. I'm ready to assist with clinical definitions or system functionality. How can I help?"
      : "Hello! I'm your EyeGuard educational assistant. I can help answer questions about eye health, common symptoms, or what our screening covers. What would you like to know?";
  }

  // Diabetic Retinopathy
  if (lowerMsg.includes('diabetic') || lowerMsg.includes('dr')) {
    return role === 'doctor'
      ? "Diabetic Retinopathy (DR) is classified into non-proliferative (NPDR) and proliferative (PDR) stages. Our AI detects microaneurysms, hemorrhages, hard exudates, and cotton wool spots to estimate probability."
      : "Diabetic Retinopathy is a condition that affects people with diabetes. High blood sugar can damage the tiny blood vessels in the retina. Early detection is key, as it often has no symptoms in the early stages!";
  }

  // Glaucoma
  if (lowerMsg.includes('glaucoma')) {
    return role === 'doctor'
      ? "For Glaucoma, the model primarily analyzes the Optic Disc-to-Cup ratio (CDR) and thinning of the neuroretinal rim. High CDR indicates elevated glaucoma risk."
      : "Glaucoma is a group of eye conditions that damage the optic nerve, often due to high pressure in the eye. It's sometimes called the 'silent thief of sight' because you might not notice vision loss until it's advanced.";
  }

  // AMD
  if (lowerMsg.includes('amd') || lowerMsg.includes('macular')) {
    return role === 'doctor'
      ? "Age-Related Macular Degeneration (AMD) detection focuses on identifying drusen deposits and pigmentary abnormalities in the macular region."
      : "Age-Related Macular Degeneration (AMD) affects the central part of the retina, called the macula. It can make it hard to read or recognize faces. Eating leafy greens and protecting your eyes from UV light can help lower your risk.";
  }

  // Symptoms
  if (lowerMsg.includes('symptom') || lowerMsg.includes('blur') || lowerMsg.includes('pain')) {
    return "If you are experiencing blurry vision, flashes of light, dark spots (floaters), or eye pain, you should see an eye care professional immediately. Our screening tool provides general risk awareness but does not replace a clinical diagnosis.";
  }

  // How the AI works
  if (lowerMsg.includes('how') && (lowerMsg.includes('work') || lowerMsg.includes('ai'))) {
    return role === 'doctor'
      ? "The system uses a Convolutional Neural Network (CNN) architecture. It processes the fundus image to extract features and outputs probabilities for 4 classes. Grad-CAM is used to generate heatmaps showing which regions influenced the prediction the most."
      : "Our AI has been trained on thousands of retinal images. It looks for tiny patterns and changes in your retina that might indicate a problem, much like a doctor would. The heatmaps show exactly where the AI 'looked' to make its guess!";
  }

  // Default response
  return role === 'doctor'
    ? "I can provide information on the AI model parameters, disease markers detected, and how to interpret the Grad-CAM heatmaps. Could you specify your query?"
    : "I'm still learning! You can ask me about Diabetic Retinopathy, Glaucoma, Macular Degeneration, or general eye health symptoms. Remember, I'm an educational tool, not a doctor.";
};
