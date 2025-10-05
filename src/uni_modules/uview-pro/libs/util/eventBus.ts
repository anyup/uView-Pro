// utils/eventBus.ts

// 更灵活的事件回调类型定义
type EventCallback = (data?: any, ...args: any[]) => void;

class EventBus {
    private events: Map<string, EventCallback[]> = new Map();

    /**
     * 监听事件
     */
    on(event: string, callback: EventCallback): void {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event)!.push(callback);
    }

    /**
     * 一次性监听
     */
    once(event: string, callback: EventCallback): void {
        const onceCallback: EventCallback = (data, ...args) => {
            callback(data, ...args);
            this.off(event, onceCallback);
        };
        this.on(event, onceCallback);
    }

    /**
     * 触发事件
     */
    emit(event: string, data?: any, ...args: any[]): void {
        if (this.events.has(event)) {
            this.events.get(event)!.forEach(callback => {
                try {
                    callback(data, ...args);
                } catch (error) {
                    console.error(`EventBus error in ${event}:`, error);
                }
            });
        }
    }

    /**
     * 取消监听
     */
    off(event: string, callback?: EventCallback): void {
        if (!this.events.has(event)) return;

        if (callback) {
            const callbacks = this.events.get(event)!;
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        } else {
            this.events.delete(event);
        }
    }

    /**
     * 检查是否有监听器
     */
    has(event: string): boolean {
        return this.events.has(event) && this.events.get(event)!.length > 0;
    }

    /**
     * 清理所有事件
     */
    clear(): void {
        this.events.clear();
    }
}

// 创建全局实例
export const eventBus = new EventBus();

// 热更新处理
if (import.meta.hot) {
    import.meta.hot.accept(() => {
        // 热更新时不清理事件，保持事件监听
        console.log('EventBus hot updated');
    });
}
