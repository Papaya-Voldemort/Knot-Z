<script lang="ts">
  /* Imports */
  import '../../../font/fonts.css';

  /* Date and time */
  import { onMount } from 'svelte';

  const optionsDate: Intl.DateTimeFormatOptions = {
    day: 'numeric' as const,
    month: 'numeric' as const,
    year: 'numeric' as const,
  };

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: 'numeric' as const,
    minute: 'numeric' as const,
    hour12: true,
  };

  // Helper function to get current strings
  const getNow = () => new Date();
  
  // Set time and date on load
  let time: string = getNow().toLocaleTimeString([], optionsTime);
  let date: string = getNow().toLocaleDateString([], optionsDate);

  // Update time and date every second
  onMount(() => {
    const interval = setInterval(() => {
      const now = getNow();
      time = now.toLocaleTimeString([], optionsTime);
      date = now.toLocaleDateString([], optionsDate);
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<main>
  <section id="desktop">
    <section id="background"></section>
    <section id="taskbar">
      <section id="taskbar-apps">
        <!-- PLACEHOLDERS -->
        <div id="taskbar-app-placeholder-1" class="taskbar-app-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg></div>
        <div id="taskbar-app-placeholder-2" class="taskbar-app-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg></div>
        <div id="taskbar-app-placeholder-3" class="taskbar-app-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg></div>
      </section>
      <section id="taskbar-right">
        <div id="taskbar-volume">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM32,96H72v64H32ZM144,207.64,88,164.09V91.91l56-43.55Zm54-106.08a40,40,0,0,1,0,52.88,8,8,0,0,1-12-10.58,24,24,0,0,0,0-31.72,8,8,0,0,1,12-10.58ZM248,128a79.9,79.9,0,0,1-20.37,53.34,8,8,0,0,1-11.92-10.67,64,64,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67A79.83,79.83,0,0,1,248,128Z"></path></svg> <!--PhosphorIcons.com-->
        </div>
        <div id="taskbar-notifications">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path></svg> <!--PhosphorIcons.com-->
        </div>
        <div id="taskbar-clock">
          <span id="taskbar-clock-time">{time}</span>
          <br>
          <span id="taskbar-clock-date">{date}</span>
        </div>
      </section>
    </section>
  </section>
</main>

<style>
  :global(*, *::before, *::after) {
    box-sizing: border-box;
  }

  :global(html, body) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  main {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
  }

  #desktop {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #background {
    flex: 1;
    position: relative;
    background-color: #1e1e1e;
    background-image: url('./wallpaper/Wallpaper1.jpg');
    background-size: cover;
    background-position: center;
    overflow: hidden;
  }

  #taskbar {
    height: 3rem;
    flex-shrink: 0;
    display: flex;
    position: fixed;
    width: 100%;
    bottom: 0;
    border-top: 1px solid #00000044;
    justify-content: space-between;
    align-items: center;
    background-color: #242424ee;
    padding: 0 12px;
    z-index: 1000;
  }

  #taskbar-apps {
    display: flex;
    align-items: center;
    width: 50%;
    height: 100%;
  }

  #taskbar-apps > div {
    margin-right: 12px;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    border-radius: 8px;
    padding: 0.1rem;
    width: 2.5rem;
    height: 2.5rem;
  }

  #taskbar-apps > div:hover {
    cursor: pointer;
    transform: scale(1.1);
    background-color: #00000044;
    transition: all 0.2s ease-in-out;
  }

  #taskbar-apps > div:active {
    transform: scale(1.05);
    transition: all 0.1s ease-in-out;
  }

  #taskbar-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 40%;
    height: 100%;
  }

  #taskbar-right > div {
    margin-left: 1rem;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }

  #taskbar-right > div:not(:last-child) {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #taskbar-right > div:hover:not(:last-child) {
    cursor: pointer;
    background-color: #00000044;
    border-radius: 8px;
    transform: scale(1.1);
    transition: all 0.2s ease-in-out;
  }

  #taskbar-right > div:active:not(:last-child) {
    transform: scale(1.05);
    transition: all 0.1s ease-in-out;
  }

  #taskbar-right > div:hover:last-child {
    cursor: default;
  }

  #taskbar-clock {
    color: #fff;
    text-align: center;
    margin-right: 0.2rem;
  }

  #taskbar-clock-time {
    font-size: 0.9rem;
  }

  #taskbar-clock-date {
    font-size: 0.8rem;
  }
</style>