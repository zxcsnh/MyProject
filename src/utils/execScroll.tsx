  const execScroll = (time: number, height: number) => {
    if (time <= 0) return;

    const start = window.pageYOffset;
    const change = height;
    const duration = time;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // 使用缓动函数
      const easeProgress =
        progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

      window.scrollTo(0, start + change * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };