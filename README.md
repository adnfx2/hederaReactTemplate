# Hedera React Template

This template allows you to create a front-end application that connects to Hedera Testnet with minimal
configuration. To learn about Hedera SDK, visit the
[Hedera sdk-js](https://docs.hedera.com/guides/getting-started/javascript).



## Using The Template

### Installation

```bash
# Clone the repository
git clone https://github.com/adnfx2/hederaReactTemplate.git
cd ./hederaReactTemplate
yarn install
```

## Usage

Before starting this project it's highly recommended to create a Hedera test account [here](https://portal.hedera.com/register).

After registering you're going to need the brand new accountId and privateKey given to you in a .env file. 

Create a .env file at the root of your project and use your keys with the following variables:
```javascript
 REACT_APP_MY_ACCOUNT_ID = 'paste_here_your_account_id'
 REACT_APP_MY_PRIVATE_KEY= 'paste_here_your_private_key'
```
You can start the template running 

```bash
yarn start
```
## Template preview

[Try the template here](https://adnfx2.github.io/hederaReactTemplate/)

![Preview](https://github.com/adnfx2/hederaReactTemplate/blob/master/assets/hederaReactTemplate.png)
