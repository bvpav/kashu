# KASHU

![KASHU](https://cdn.discordapp.com/attachments/1254478023198118020/1255516152130437172/63f726252796e35f.png?ex=667ebb89&is=667d6a09&hm=784ed99e79b650f8d52d4a9baabe0a006c4d2429d939beccc84beacad1ada6be&)

KASHU is your personal assistant, who helps you find your way inside the supermarket. Waste no time during your next grocery shopping trip and take the shortest possible path from the entrance, to the checkout, completing your entire shopping list in the way.

What are you waiting for? Shop with KASHU today!

![Get it on Google Play](https://i.imgur.com/UYXKgHw.png) ![Download on the App Store](https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg)

## Setup Instructions

### Backend API

A container runtime, such as Docker, is required. To configure the container, run:

```console
$ docker compose up --build
```

### Mobile Application

To build the mobile application located in the `mobile/` directory, you need to use pnpm, a fast, disk space-efficient package manager. Follow these steps to set up and build the mobile application:

1. **Install pnpm**

   Ensure you have Node.js installed. If pnpm is not installed, you can install it globally using npm:

   ```console
   $ npm install -g pnpm
   ```

2. **Navigate to the Mobile Directory**

   Change your current directory to the `mobile/` directory:

   ```console
   $ cd mobile/
   ```

3. **Install Dependencies**

   Use pnpm to install the necessary dependencies:

   ```console
   $ pnpm install
   ```

4. **Build the Application**

   Once the dependencies are installed, build the mobile application:

   ```console
   $ pnpm run build
   ```

5. **Run the Application**

   To run the mobile application, use the following command:

   ```console
   $ pnpm start
   ```

   This command starts the development server, and you can view the application on your emulator or connected mobile device.

6. **Additional Commands**

   - **Linting**: To lint the code and ensure it adheres to coding standards, run:

     ```console
     $ pnpm run lint
     ```

   - **Testing**: To run tests, execute:

     ```console
     $ pnpm run test
     ```

   - **Cleaning**: To clean the build artifacts, use:

     ```console
     $ pnpm run clean
     ```