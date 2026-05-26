# Project Reflection

### What went well?
The decision to use a serverless architecture for the AI and Email proxies was a major win. It kept the frontend lightweight and the API keys secure. I was also surprised by how effective the "Skeleton Loaders" were in making the data fetching feel faster than it actually is.

### Biggest Challenges
Implementing the PDF export was the most difficult task. Handling CSS transforms and high-density images inside a `canvas` element required multiple iterations to ensure the final report looked professional and wasn't blurry.

### Lessons Learned
I learned that building for the "edge cases" (like the user who already has $0 savings) is what actually makes a product feel finished. It’s not just about the "Happy Path"; it's about how the app handles every possible user scenario.