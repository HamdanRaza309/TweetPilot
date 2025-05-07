import { config } from "dotenv";
import { TwitterApi } from "twitter-api-v2";

// Load environment variables
config();

// Initialize Twitter API client
const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Function to create a post (tweet)
export async function createPost(status) {
    try {
        // Debug: Log the credentials to ensure they are being read correctly
        console.log("API Key:", process.env.TWITTER_API_KEY);
        console.log("API Secret:", process.env.TWITTER_API_SECRET);
        console.log("Access Token:", process.env.TWITTER_ACCESS_TOKEN);
        console.log("Access Token Secret:", process.env.TWITTER_ACCESS_TOKEN_SECRET);

        // Verify credentials by fetching user data
        const user = await twitterClient.v2.me();
        console.log("Authenticated User:", user);

        // Check rate limit
        const rateLimit = await twitterClient.v2.rateLimit();
        console.log("Rate Limit:", rateLimit);

        // Log the status before posting
        console.log("Attempting to post status:", status);

        // Create a tweet
        console.log("Posting tweet...");
        const newPost = await twitterClient.v2.tweet(status);
        console.log("Tweet created successfully:", newPost);

        // Return success message
        return {
            content: [
                {
                    type: "text",
                    text: `Tweeted: ${status}`
                }
            ]
        };
    } catch (error) {
        // Debug: Log the error with full details
        console.error("Error tweeting:", error);
        console.error("Detailed error response:", error.response ? error.response.data : error.message);

        // Return error message
        return {
            content: [
                {
                    type: "text",
                    text: `Failed to tweet: ${error.message}`
                }
            ]
        };
    }
}
