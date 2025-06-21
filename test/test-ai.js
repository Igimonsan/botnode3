// Test file untuk menguji koneksi AI Hugging Face
require('dotenv').config();
const HuggingFaceService = require('../ai/huggingfaceService');

async function testAI() {
    console.log('🧪 Testing AI Hugging Face Service...\n');
    
    const ai = new HuggingFaceService();
    const testUserId = 'test-user-123';
    
    // Test 1: Connection Test
    console.log('1️⃣ Testing connection...');
    const connectionTest = await ai.testConnection();
    console.log(`   ${connectionTest.success ? '✅' : '❌'} ${connectionTest.message}\n`);
    
    // Test 2: Simple Chat
    console.log('2️⃣ Testing simple chat...');
    const chatResult = await ai.chat(testUserId, 'Hello, how are you?');
    
    if (chatResult.success) {
        console.log('   ✅ Chat successful');
        console.log(`   🤖 AI Response: ${chatResult.response}\n`);
    } else {
        console.log('   ❌ Chat failed');
        console.log(`   Error: ${chatResult.error}\n`);
    }
    
    // Test 3: Indonesian Chat
    console.log('3️⃣ Testing Indonesian chat...');
    const indonesianChatResult = await ai.chat(testUserId, 'Halo, apa kabar? Bisakah kamu berbahasa Indonesia?');
    
    if (indonesianChatResult.success) {
        console.log('   ✅ Indonesian chat successful');
        console.log(`   🤖 AI Response: ${indonesianChatResult.response}\n`);
    } else {
        console.log('   ❌ Indonesian chat failed');
        console.log(`   Error: ${indonesianChatResult.error}\n`);
    }
    
    // Test 4: Conversation History
    console.log('4️⃣ Testing conversation history...');
    const historyResult = await ai.chat(testUserId, 'What did I just ask you?');
    
    if (historyResult.success) {
        console.log('   ✅ History test successful');
        console.log(`   🤖 AI Response: ${historyResult.response}\n`);
    } else {
        console.log('   ❌ History test failed');
        console.log(`   Error: ${historyResult.error}\n`);
    }
    
    // Test 5: Model switching
    console.log('5️⃣ Testing model switching...');
    const modelSwitch = ai.setUserModel(testUserId, 'creative');
    console.log(`   ${modelSwitch ? '✅' : '❌'} Model switch ${modelSwitch ? 'successful' : 'failed'}\n`);
    
    // Test 6: Stats
    console.log('6️⃣ Testing stats...');
    const stats = ai.getStats();
    console.log('   ✅ Stats retrieved');
    console.log(`   📊 Total users: ${stats.totalUsers}`);
    console.log(`   💬 Total conversations: ${stats.totalConversations}`);
    console.log(`   🟢 Active users: ${stats.activeUsers}\n`);
    
    // Test 7: Available models
    console.log('7️⃣ Testing available models...');
    const models = ai.getAvailableModels();
    console.log('   ✅ Models retrieved');
    models.forEach((model, index) => {
        console.log(`   ${index + 1}. ${model.name} - ${model.description}`);
    });
    
    console.log('\n🎉 AI Testing completed!');
}

// Jalankan test
testAI().catch(error => {
    console.error('💥 Test failed:', error);
    process.exit(1);
});