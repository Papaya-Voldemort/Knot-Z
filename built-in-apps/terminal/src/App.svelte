<script lang="ts">
    let input = $state('');
    let history = $state(['Welcome to Knot-Z Terminal v0.1.0']);

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Enter' && input.trim()) {
        history = [...history, `$ ${input}`];
        input = '';
      }
    }
</script>

<main class="terminal-container">
    <div class="output">
        {#each history as line}
            <div class="line">{line}</div>
        {/each}
    </div>

    <div class="prompt-row">
        <span class="prompt">&gt;</span>
        <input
              type="text"
              bind:value={input}
              onkeydown={handleKeydown}
              placeholder="Type a command..."
              autofocus
            />
    </div>
</main>


<style>
    :global(html, body) {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    :global(#app) {
        width: 100%;
        height: 100%;
    }
    
    .terminal-container {
        box-sizing: border-box;
        background-color: rgba(18, 18, 18, 0.2);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        flex-direction: column;

        width: 100%;
        height: 100%;
        display: flex;

        padding: 1rem;

        font-size: 18px;
        font-family: monospace;
    }

    .output {
        flex: 1;
        overflow-y: auto;
        min-height: 0;
    }

    .prompt-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.5rem;

        font-size: 18px;
        font-family: monospace;
    }

    input {
        flex: 1;
        background: transparent;
        border: none;
        color: inherit;
        font-family: inherit;
        outline: none;
    }
</style>