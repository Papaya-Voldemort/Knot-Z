<script lang="ts">
    import { ShellSession } from "@webos/app-api";

    let input = $state("");
    let history = $state<string[]>(["Welcome to Knot-Z Terminal v0.1.0"]);
    let fullHistory = $state<string[]>([]);
    let commandHistory = $state<string[]>([]);
    let historyIndex = $state(-1);
    let isExecuting = $state(false);

    function addHistory(item: string) {
        history.push(item);
        fullHistory.push(item);
    }

    const session = new ShellSession({
        cwd: "/home/user", // temp: update with actual starting path when file system is made
        stdout: (line) => {
            if (line === "!!>CLEAR>!!") {
                history = [];
            } else {
                addHistory(line);
            }
        },
        stderr: (err) => {
            addHistory(err);
        },
    });

    async function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Enter" && input.trim()) {
            const commandLine = input.trim();

            commandHistory.push(commandLine);
            historyIndex = -1;

            addHistory(`$ ${session.context.cwd} $ ${commandLine}`);

            input = "";
            isExecuting = true;

            try {
                await session.execute(commandLine);
            } finally {
                isExecuting = false;
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault();

            if (commandHistory.length === 0) return;

            if (historyIndex === -1) {
                historyIndex = commandHistory.length - 1;
            } else if (historyIndex > 0) {
                historyIndex--;
            }

            input = commandHistory[historyIndex];
        } else if (e.key === "ArrowDown") {
            e.preventDefault();

            if (commandHistory.length === 0 || historyIndex === -1) return;

            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input = commandHistory[historyIndex];
            } else {
                historyIndex = -1;
                input = "";
            }

            input = commandHistory[historyIndex];
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
