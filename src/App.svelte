<script lang="ts">
  import { router, Router } from '../.routify/instance.default';
  import { onMount } from 'svelte';
  import Loading from './lib/component/Loading.svelte';
  import { PushNotifications } from '@capacitor/push-notifications';
  import { goto } from '@roxi/routify';
  import { Preferences } from '@capacitor/preferences';
  import { mobile_id } from './store';
  import { App } from '@capacitor/app';
  import 'flatpickr/dist/flatpickr.css';
  import 'flatpickr/dist/themes/light.css';

  let app = import.meta.env.VITE_APP;
  
    App.addListener('appStateChange', ({ isActive }) => {
        console.log('App state changed. Is active?', isActive);
    });

    App.addListener('appUrlOpen', data => { 
      // let url = data.url.split('/');
      // if(url[url.length - 3]=='task' && url[url.length -2]=='detail'){
      //   $goto('/task/[id]',{id:url[url.length -1]});
      // }
      console.log('App opened with URLS:', JSON.stringify(data));
    });

    App.addListener('appRestoredResult', data => {
        console.log('Restored state:', data);
    });

    const checkAppLaunchUrl = async () => {
        const { url } = await App.getLaunchUrl();

        console.log('App opened with URL: ' + url);
    };
  const addListeners = async () => {
    await PushNotifications.addListener('registration', token => {
      getMobileId(token.value);
    });

    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', JSON.stringify(notification));
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      const data = notification.notification.data;
      console.log(JSON.stringify(data));
      
      // if (data.task_id) {
      //   $goto('/task/[id]',{id:data.task_id});
      // }
    });

    const getMobileId = async (token) => {
      mobile_id.set(token);
        await Preferences.set({ 
          key: 'mobile_id',
          value: token
        });
    };
  }

  const registerNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    await PushNotifications.register();
  }

  const getDeliveredNotifications = async () => {
    const notificationList = await PushNotifications.getDeliveredNotifications();
  }

  let loaded = false;
  onMount(() => {
    setTimeout(async()=>{
      loaded = true
      checkAppLaunchUrl();
      if(app=='production'){
        addListeners();
        registerNotifications();
        getDeliveredNotifications();
      }else{
        await Preferences.set({ 
          key: 'mobile_id',
          value: 'QWERTYUIOPlkjhgfdsaZXCVBNM<>'
        });
      }
      },2000);
  });
</script>

{#if loaded}
  <Router {router} />
{:else}
  <Loading/>
{/if}