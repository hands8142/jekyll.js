---
title: "javascript로 디스코드 봇만들기 1화"
name: "awesome-nextjs-blog"
description: "기초작업 하기"
date: 2020-12-30T10:53:00+09:00
categories: NodeJS DiscordJS javascript
---

# 디스코드 앱 추가
[디스코드 개발자 페이지](https://discord.com/developers/applications)에서 어플리케이션을 추가해주세요.
이름은 아무거나 해주세요.

어플리케이션에 들어가신 다음 Bot탭으로 가셔서 Add Bot 버튼을 누르시면 위 창이 뜹니다.
Yes, do it! 눌러주시면 됩니다.
이름을 변경해주세요. 여기이름은 봇에 표시될 이름입니다.
나중에 로그인할 때 토큰을 사용하니 Copy 버튼을 클릭하셔서 어디 잘 보관해둬 주세요.
봇에 로그인을 토큰으로만 진행하므로 외부에 유출하시면 안 됩니다.

nodejs를 설치합니다.
설치 방법은 따로 올리겠습니다.

봇 구동에 쓸 파일들을 넣을 폴더를 하나 생성해주세요.
그 후 터미널을 켜서 해당 폴더로 이동해주세요.
cd 명령어를 사용하시거나, vs code를 사용하시면 우클릭 -> Open in Terminal 클릭하시면 터미널에서 바로 열립니다. (설치할때 설정하셔야 합니다.)

discord.js를 설치하기전 npm init -y(npm은 nodejs를 설치할때 같이 설치 됩니다.)로 package.json를 생성해주세요.
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
    }
```
를
```json
"scripts": {
    "start": "node index.js"
  }
```
로 변경해주세요.

이제 discord.js를 설치할 차례입니다.
npm install discord.js를 실행해주세요.

index.js를 만드신 후에 코드를 작성해주세요.
```js
const { Client } = require('discord.js');
const client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.content === 'ping') {
    message.channel.send('Pong!');
  }
});

client.login('token');
```

```py
print("")
```
token에는 아까 만든 못의 토큰을 넣어주세요.

이를 실행하기 위해서는 npm run start를 입력해주시면 됩니다.