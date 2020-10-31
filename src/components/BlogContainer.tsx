import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import React from 'react';

import Firebase from 'firebase'

interface ContainerProps {
  isLoading: boolean
  blogs
}

const BlogContainer: React.FC<ContainerProps> = (props): any => {
  const { blogs, isLoading } = props;
  
  if (isLoading) return <p>Loading...</p>
  if (blogs === null || blogs.length === 0) return <p>No blog posts available</p>

  function blogDelete(id) {
    Firebase.database().ref(`/blogs/${id}/`).remove().then(() => { window.location.reload()});
  }

  function dateString(date: Date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  return(
    Object.entries(blogs).map(([id, blog]: any) => {
      return (
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>{dateString(new Date(parseInt(id)))}</IonCardSubtitle>
            <IonCardTitle>{blog.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>{blog.content}</IonCardContent>
          <IonButton onClick={() => { blogDelete(id) }} size="default" color="danger">Delete</IonButton>
        </IonCard >
      )
    })
  )
};

export default BlogContainer;
