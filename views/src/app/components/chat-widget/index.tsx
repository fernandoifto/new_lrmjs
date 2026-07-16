'use client';

import { useEffect, useRef, useState } from 'react';
import { FaHeart, FaPaperPlane, FaPaperclip, FaTimes } from 'react-icons/fa';
import styles from './styles.module.css';

const CONFIG = {
    webhookUrl: 'https://n8n.giftmed.org/webhook/aac0b4a5-dbae-4774-a706-0e7f7026f855/chat',
    title: 'Farmácia Solidária',
    subtitle: 'GiftMed · Fale com a gente',
    calloutText: 'Oi! Precisa de ajuda?',
};

interface ChatMessage {
    role: 'bot' | 'user';
    text?: string;
    photoUrls?: string[];
}

interface PendingAttachment {
    file: File;
    url: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [calloutHidden, setCalloutHidden] = useState(false);
    const [started, setStarted] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [pendingFiles, setPendingFiles] = useState<PendingAttachment[]>([]);

    const sessionIdRef = useRef<string>('');
    if (!sessionIdRef.current) {
        sessionIdRef.current = `gm-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }

    const messagesRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    async function sendToAgent(chatInput: string) {
        setIsTyping(true);
        try {
            const res = await fetch(CONFIG.webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'sendMessage', sessionId: sessionIdRef.current, chatInput }),
            });
            const data = await res.json();
            const reply = data.output || data.text || 'Desculpe, algo deu errado. Pode tentar de novo?';
            setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: 'bot', text: 'Não consegui me conectar agora. Tente novamente em instantes.' },
            ]);
        } finally {
            setIsTyping(false);
        }
    }

    function handleOpen() {
        setIsOpen(true);
        setCalloutHidden(true);
        if (!started) {
            setStarted(true);
            sendToAgent('oi');
        }
    }

    function handleSend() {
        const text = inputValue.trim();
        if (!text && pendingFiles.length === 0) return;

        const photoUrls = pendingFiles.map((a) => a.url);
        setMessages((prev) => [...prev, { role: 'user', text, photoUrls }]);

        let chatInput = text;
        if (pendingFiles.length > 0) {
            const names = pendingFiles.map((a) => a.file.name).join(', ');
            const note = `[Anexou ${pendingFiles.length} foto(s) do(s) medicamento(s): ${names}]`;
            chatInput = text ? `${text}\n${note}` : note;
        }

        setInputValue('');
        setPendingFiles([]);
        sendToAgent(chatInput);
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files ?? []);
        const newAttachments = files.map((file) => ({ file, url: URL.createObjectURL(file) }));
        setPendingFiles((prev) => [...prev, ...newAttachments]);
        e.target.value = '';
    }

    function removeAttachment(index: number) {
        setPendingFiles((prev) => {
            const copy = [...prev];
            const [removed] = copy.splice(index, 1);
            if (removed) URL.revokeObjectURL(removed.url);
            return copy;
        });
    }

    return (
        <>
            <div className={`${styles.launcher} ${calloutHidden ? styles.calloutHidden : ''}`}>
                <div className={styles.callout}>{CONFIG.calloutText}</div>
                <button type="button" className={styles.bubble} aria-label="Abrir chat" onClick={handleOpen}>
                    <FaHeart />
                </button>
            </div>

            <div className={`${styles.window} ${isOpen ? styles.windowOpen : ''}`}>
                <div className={styles.header}>
                    <div className={styles.headerIcon}>
                        <FaHeart />
                    </div>
                    <div className={styles.headerText}>
                        <strong>{CONFIG.title}</strong>
                        <span>{CONFIG.subtitle}</span>
                    </div>
                    <button
                        type="button"
                        className={styles.close}
                        aria-label="Fechar"
                        onClick={() => setIsOpen(false)}
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className={styles.messages} ref={messagesRef}>
                    {messages.map((m, i) => (
                        <div key={i} className={`${styles.msg} ${m.role === 'bot' ? styles.bot : styles.user}`}>
                            {m.text}
                            {m.photoUrls && m.photoUrls.length > 0 && (
                                <div className={styles.msgPhotos}>
                                    {m.photoUrls.map((url, j) => (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img key={j} src={url} alt="" />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {isTyping && <div className={styles.typing}>digitando...</div>}

                <div className={`${styles.previews} ${pendingFiles.length > 0 ? styles.previewsShow : ''}`}>
                    {pendingFiles.map((a, i) => (
                        <div key={i} className={styles.previewChip}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={a.url} alt="" />
                            <button
                                type="button"
                                className={styles.previewRemove}
                                aria-label="Remover foto"
                                onClick={() => removeAttachment(i)}
                            >
                                <FaTimes size={9} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className={styles.inputbar}>
                    <button
                        type="button"
                        className={styles.attach}
                        aria-label="Anexar fotos"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <FaPaperclip />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Digite sua mensagem..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSend();
                        }}
                    />
                    <button type="button" className={styles.send} aria-label="Enviar" onClick={handleSend}>
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </>
    );
}
