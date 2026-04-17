const jsonFiles = import.meta.glob('../../docs/prd/json/*.json', { eager: true });

export class DataLoader {
  static parse() {
    const topics = [];
    const fallbackOptions = ['True', 'False', 'I am not sure', 'None of the above'];

    for (const path in jsonFiles) {
      let data = jsonFiles[path];
      if (data.default) data = data.default;

      if (data.modules) {
        data.modules.forEach(mod => {
          const topic = {
            id: mod.module_id || mod.topic.toLowerCase().replace(/\s+/g, '-'),
            name: mod.topic,
            color: 0x4a90d9, // Default blue, can map later
            emoji: '📚',
            questions: []
          };

          mod.challenges.forEach(chal => {
            let options = chal.options || [];
            let correctArray = Array.isArray(chal.correct_answer) ? chal.correct_answer : [chal.correct_answer];
            let ca = correctArray[0] || 'A';
            let correctIndex = 0;

            if (options.length === 0) {
              // Provide dummy options for short_answer to allow game loop to function
              options = [ca, 'Option B', 'Option C', 'Option D'];
            } else {
              correctIndex = options.indexOf(ca);
              if (correctIndex === -1 && options.length > 0) {
                correctIndex = 0; // fallback if not found
                options[0] = ca;
              }
            }

            topic.questions.push({
              id: chal.id,
              question: chal.question,
              options: options,
              correct: correctIndex,
              hint: chal.gamification?.coaching_hint || 'Try your best!'
            });
          });
          topics.push(topic);
        });
      }
    }
    return topics;
  }
}
