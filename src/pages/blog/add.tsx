import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/database'
import { Redirect } from 'react-router';

import './add.css'

const BlogAdd: React.FC = (prop) => {
  const [blog, setBlog] = useState({
    title: '',
    content: ''
  });

  const [redirect, setRedirect] = useState<boolean>(false);

  function addBlog() {
    firebase.database().ref(`/blogs/${new Date().getTime()}`).set(blog).then(() => {
      setRedirect(true);
    })
  }

  if (redirect) return <Redirect to='/blogs' />

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Blog</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton href="/blogs" size="small" color="danger">Back</IonButton>

        <IonItem>
          <IonLabel>Title</IonLabel>
          <IonInput value={blog.title} onIonChange={e => setBlog({title: e.detail.value!, content: blog.content})} placeholder="Title"></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Content</IonLabel>
          <IonTextarea auto-grow="true" value={blog.content} onIonChange={e => setBlog({title: blog.title, content: e.detail.value!})} placeholder="content"></IonTextarea>
        </IonItem>  

        <IonButton expand="full" onClick={() => { addBlog() }} size="default" color="success">Add</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default BlogAdd