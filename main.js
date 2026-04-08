document.addEventListener('DOMContentLoaded', () => {
    // Input elements
    const goalInput = document.getElementById('goal');
    const todoInput = document.getElementById('todo');
    const doneInput = document.getElementById('done');
    const undoneInput = document.getElementById('undone');
    const reasonInput = document.getElementById('reason');
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    
    // Output element
    const previewOutput = document.getElementById('preview-output');
    
    // Copy elements
    const copyBtn = document.getElementById('copy-btn');
    const copyFeedback = document.getElementById('copy-feedback');

    // Default template date (Today)
    const getFormattedDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const days = ['日', '月', '火', '水', '木', '金', '土'];
        const day = days[today.getDay()];
        return `${yyyy}/${mm}/${dd} (${day})`;
    };

    // Generate Markdown/Text Report
    const generateReport = () => {
        const goal = goalInput.value.trim() || '未入力';
        const todo = todoInput.value.trim() || '未入力';
        const done = doneInput.value.trim() || '未入力';
        const undone = undoneInput.value.trim() || 'なし';
        const reason = reasonInput.value.trim() || 'なし';
        
        // Get selected rating
        let rating = '3';
        for (const r of ratingInputs) {
            if (r.checked) {
                rating = r.value;
                break;
            }
        }
        
        const stars = '⭐'.repeat(parseInt(rating)) + '・'.repeat(5 - parseInt(rating));

        const template = `■ 本報（${getFormattedDate()}）

【🎯 目標】
${goal}

【📋 やること】
${todo}

【✅ できたこと】
${done}

【⚠️ できなかったこと】
${undone}

【💡 その理由】
${reason}

【⭐ 達成度】
${stars} (${rating}/5)
`;
        
        previewOutput.textContent = template;
    };

    // Add event listeners to all inputs to update preview in real-time
    const inputs = [goalInput, todoInput, doneInput, undoneInput, reasonInput];
    inputs.forEach(input => {
        input.addEventListener('input', generateReport);
    });

    ratingInputs.forEach(input => {
        input.addEventListener('change', generateReport);
    });

    // Initial generation
    generateReport();

    // Copy to clipboard functionality
    copyBtn.addEventListener('click', async () => {
        const textToCopy = previewOutput.textContent;
        
        try {
            await navigator.clipboard.writeText(textToCopy);
            
            // Show feedback
            copyFeedback.classList.add('show');
            
            // Hide feedback after 2 seconds
            setTimeout(() => {
                copyFeedback.classList.remove('show');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert('コピーに失敗しました。お使いのブラウザ権限を確認してください。');
        }
    });
});
