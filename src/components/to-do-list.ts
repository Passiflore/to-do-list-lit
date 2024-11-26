import { html, css, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

type Task = {
	id: string;
	text: string;
	completed: boolean;
};

@customElement("to-do-list")
export class HelloWord extends LitElement {
	static styles = css`
		.container {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			background-color: #f9f9f9;
			border: 1px solid #ddd;
			border-radius: 8px;
			padding: 20px;
			width: 100%;
			max-width: 400px;
		}
		h1 {
			font-size: 24px;
			color: #333;
			margin-bottom: 16px;
		}
		ul {
			list-style: none;
			padding: 0;
			width: 100%;
		}
		li {
			color: black;
			background: #fff;
			padding: 10px 15px;
			margin: 8px 0;
			border-radius: 4px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border: 1px solid #ddd;
			cursor: pointer;
			transition: 0.3s ease, box-shadow 0.3s ease;
		}

		li:hover {
			background-color: #f1f1f1;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		}
		.completed {
			text-decoration: line-through;
			color: #777;
			transition: 0.3s ease, box-shadow 0.3s ease;
		}

		input {
			width: 100%;
			padding: 10px;
			margin-top: 16px;
			border: 1px solid #ddd;
			border-radius: 4px;
			font-size: 14px;
			box-sizing: border-box;
			outline: none;
			transition: border-color 0.3s ease, box-shadow 0.3s ease;
		}

		input:focus {
			border-color: #333;
			box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
		}

		button {
			padding: 10px 20px;
			margin-top: 10px;
			background-color: #333;
			color: #fff;
			border: none;
			border-radius: 4px;
			font-size: 14px;
			cursor: pointer;
			transition: background-color 0.3s ease, transform 0.2s ease;
		}

		button:hover {
			background-color: #555;
			transform: scale(1.05);
		}

		button:active {
			transform: scale(0.95);
		}

		li {
			animation: fadeIn 0.5s ease;
		}

		@keyframes fadeIn {
			from {
				opacity: 0;
				transform: translateY(-10px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}
	`;

	@property({ type: Array })
	tasks: Task[] = JSON.parse(localStorage.getItem("to-do-list") || "[]");

	render() {
		return html`<div class="container">
			<h1>To do list</h1>
			<ul>
				${this.tasks.map(
					(task) =>
						html`<li @click=${() => this.toggleTask(task)}>
							<p class=${task.completed ? "completed" : ""}>${task.text}</p>
							<button @click=${() => this.deleteTask(task)}>X</button>
						</li>`
				)}
			</ul>
			<input
				@keydown=${this.handleEnterPress}
				id="input"
				type="text"
				placeholder="Add a new task"
			/>
			<button @click=${this.addTask}>Add</button>
		</div>`;
	}

	@query("#input")
	input!: HTMLInputElement;

	addTask() {
		if (!this.input.value) {
			return;
		}

		this.tasks = [
			...this.tasks,
			{
				id: crypto.randomUUID(),
				text: this.input.value,
				completed: false,
			},
		];
		this.input.value = "";
		localStorage.setItem("to-do-list", JSON.stringify(this.tasks));
	}

	toggleTask(task: Task) {
		console.log("test");
		task.completed = !task.completed;
		this.requestUpdate();
	}

	deleteTask(task: Task) {
		this.tasks = this.tasks.filter((item: Task) => item.id != task.id);
		localStorage.setItem("to-do-list", JSON.stringify(this.tasks));
	}

	handleEnterPress(event: KeyboardEvent) {
		if (event.key === "Enter" && this.input.value) {
			this.addTask();
		}
	}
}
