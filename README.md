# react-native-nested-comments-with-lines

| Demo |
|-|
| <video src="https://github.com/user-attachments/assets/1f1aad15-d36d-4666-bbfb-42b8cee74aee" autoplay loop muted playsinline></video> |


A React Native proof-of-concept for nested comments with SVG connecting lines and animated expand/collapse, built with Expo.

## Features

- Nested comments up to 4 levels deep
- SVG spine + bezier elbow connecting lines between parent and child comments
- Tap the gutter line or "View N replies" to expand/collapse
- Author badge, timestamps, Love/Reply actions

## Stack

- Expo 55 / React Native 0.83
- React 19
- `react-native-svg` for connecting lines
- `date-fns` for timestamps

## Run

```bash
npm install
npx expo start
```

Open in iOS Simulator, Android Emulator, or Expo Go.

## Structure

```
components/comments/
  ThreadlineGroup.tsx   # SVG gutter (spine + elbows) + content rows
  CommentThread.tsx     # Recursive thread, expand/collapse state
  PostComment.tsx       # Comment card, reports avatar anchor Y for line drawing
  CommentBody.tsx       # Dark bubble with name + content
  PostCommentName.tsx   # Author name, badges, timestamp
  PostCommentAvatar.tsx # Circular avatar image
  CommentFooter.tsx     # Love / Reply buttons
  RepliesToggleRow.tsx  # "View N replies" toggle
  types.ts              # Comment + AuthorProfile types
  mockData.ts           # 4-level nested mock data
```
