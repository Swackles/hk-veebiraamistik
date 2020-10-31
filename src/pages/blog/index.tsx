import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import BlogContainer from '../../components/BlogContainer';

import Firebase from 'firebase/app';
import 'firebase/database'

const BlogIndex: React.FC = () => {

  const [appState, setApp] = useState({
    loading: false,
    blogs: []
  })

  useEffect(() => {
    setApp({ loading: true, blogs: [] })
    Firebase.database().ref('/blogs/').on('value', snapshot => {
      setApp({
        loading: false,
        blogs: snapshot.val()
      })
    }) 
  }, [setApp])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blogs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton expand="full" href="/blogs/add" size="default" color="success">new</IonButton>
        <BlogContainer isLoading={appState.loading} blogs={appState.blogs} />
      </IonContent>
    </IonPage>
  );
};

export default BlogIndex;
