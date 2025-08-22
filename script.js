$(function() {
  // transition for name, email and message
  $(".relative input, .relative textarea").on("focus blur input", function() {
    var label = $(this).siblings("label");
    if ($(this).val() !== "" || $(this).is(":focus")) {
      label.addClass("-top-6 text-sm").removeClass("top-4");
    } else {
      label.addClass("top-4").removeClass("-top-6 text-sm");
    }
  });
    
  $(".relative input, .relative textarea").trigger("input");

// validation for name, email and message
$('#validation-btn').on('click', function(e) {
    e.preventDefault();
        
    const rules = {
        name: { 
            required: true,
            message: "Please enter your name."
        },
        email: { 
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address."
        },
        message: { 
            required: true,
            message: "Please enter your message."
        } 
    };
    
    let isValid = true;
    
    // Validate each field
    for (const field in rules) {
        const input = $(`#${field}`);
        const errorElement = $(`#${field.toLowerCase()}-error`);
        const value = input.val().trim(); // Removed capitalization logic
        
        // Clear previous errors
        errorElement.addClass('hidden');
        input.removeClass('border-red-500');
        
        // Required validation
        if (rules[field].required && !value) {
            setError(input, errorElement, rules[field].message);
            isValid = false;
        } 
        // Pattern validation (for email)
        else if (field === 'email' && rules[field].pattern && !rules[field].pattern.test(value)) {
            setError(input, errorElement, rules[field].message);
            isValid = false;
        } 
        else {
            setSuccess(input, errorElement);
        }
    }  
    
    return isValid;
});
  
function setError(input, errorElement, message) {
    errorElement.text(message).removeClass('hidden');
    input.addClass('border-red-500');
    
    // Shake animation for the input field
    // gsap.fromTo(input, { x: 0 }, { 
    //     x: 10, 
    //     duration: 0.1, 
    //     repeat: 3, 
    //     yoyo: true 
    // });
    
    // Fade-in animation for the error message
    gsap.fromTo(errorElement, 
        { opacity: 0, scale: 0.9 }, 
        { 
            opacity: 1, 
            scale: 1, 
            duration: 0.4, 
            ease: "power2.out" 
        }
    );
}

// Helper function to clear errors
function setSuccess(input, errorElement) {
    errorElement.addClass('hidden');
    input.removeClass('border-red-500');
}

// Clear errors when focusing on inputs
$('#name, #email, #message').on('focus', function() {
    const field = $(this).attr('id').toLowerCase();
    $(`#${field}-error`).addClass('hidden');
    $(this).removeClass('border-red-500');
});

// about us photo slider
const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}

document.addEventListener('click',activate,false);

// about us animation
// $(document).ready(function() {
//       function checkVisibility(){
//         $('.fade-in').each(function(){
//           var scrollTop = $(window).scrollTop();
//           var windowHeight = $(window).height();
//           var elementTop = $(this).offset().top;
//           var elementVisible = 150; // offset from bottom of viewport to trigger

//           if (elementTop < (scrollTop + windowHeight - elementVisible)){
//             $(this).addClass('visible');
//           }
//         });
//       }

//       // Initial check
//       checkVisibility();

//       // Check on scroll
//       $(window).on('scroll', function(){
//         checkVisibility();
//       });
//     });

// team animation
  $(document).ready(function() {
    const gallery = document.getElementById('gallery');
    const items = gallery.querySelectorAll('li');

    // Set active item
    function setActiveItem(index) {
      // Remove active state from all items
      items.forEach((item, i) => {
        item.setAttribute('data-active', 'false');
        item.classList.remove('md:w-[48%]');
        item.classList.add('md:w-[8%]');
        item.style.transition = 'width 600ms cubic-bezier(0.22, 0.61, 0.36, 1)';
        
        // Reset first and last items
        if(i === 0) item.classList.add('md:first:w-[1%]');
        if(i === items.length - 1) item.classList.add('md:last:w-[1%]');
        
        // Reset content
        const content = item.querySelector('div > div:last-child');
        content.classList.add('md:translate-x-4', 'md:opacity-0');
        content.classList.remove('md:translate-x-0', 'md:opacity-100');
        
        // Reset texture
        const texture = item.querySelector('div > div:first-of-type');
        texture.classList.add('md:opacity-0');
        texture.classList.remove('md:opacity-25');
        
        // Reset images
        const img = item.querySelector('img');
        if(i === 0 || i === items.length - 1) {
          img.classList.add('md:opacity-0');
        } else {
          img.classList.remove('md:opacity-0');
        }
      });

      // Set active state on clicked item
      const activeItem = items[index];
      activeItem.setAttribute('data-active', 'true');
      activeItem.classList.remove('md:w-[8%]', 'md:first:w-[1%]', 'md:last:w-[1%]');
      activeItem.classList.add('md:w-[48%]');
      
      // Update content
      const activeContent = activeItem.querySelector('div > div:last-child');
      activeContent.classList.remove('md:translate-x-4', 'md:opacity-0');
      activeContent.classList.add('md:translate-x-0', 'md:opacity-100');
      
      // Update texture
      const activeTexture = activeItem.querySelector('div > div:first-of-type');
      activeTexture.classList.remove('md:opacity-0');
      activeTexture.classList.add('md:opacity-25');

      // Reset transition after animation
      setTimeout(() => {
        activeItem.style.removeProperty('transition');
      }, 900);
    }

    // Set click handlers
    items.forEach((item, index) => {
      item.addEventListener('click', () => setActiveItem(index));
    });

    // Initialize with middle item active
    setActiveItem(Math.floor(items.length / 2));

    
  });
    
// $(document).ready(function() {
//   const glowCircle = document.getElementById('glow-circle');
  
//   // Main entrance animation
//   gsap.from(glowCircle, {
//     scale: 0.2,
//     opacity: 0,
//     duration: 1.5,
//     ease: "elastic.out(1, 0.5)",
//     delay: 0.3
//   });

//   // Scroll-triggered animation
//   gsap.to(glowCircle, {
//     scale: 1.2,
//     opacity: 0.8,
//     scrollTrigger: {
//       trigger: glowCircle,
//       start: "top center",
//       end: "bottom center",
//       scrub: true
//     }
//   });
// });    

});

// mission and vision animation background
      const cubes = [];
      const cubeHeight = 200;
      const cubeGap = 10;

      class Cube {
        constructor() {
          this.front = new CubeWall("front");
          this.left = new CubeWall("left");
          this.right = new CubeWall("right");
          this.back = new CubeWall("back");
          this.bottom = new CubeWall("bottom");
          this.top = new CubeWall("top");
          this.$cube = null;
          this.animation = null;
          this.coordinates = { x: 0, y: 0 };
          this.rotationDegrees = { x: 0, y: 0, z: 0 };
        }

        createAndAppend(index) {
          this.$cube = $('<div>', {
            class: `product-cube ${index}-cube`
          });
          
          this.$cube.append(this.front.init());
          this.$cube.append(this.left.init());
          this.$cube.append(this.back.init());
          this.$cube.append(this.right.init());
          this.$cube.append(this.bottom.init());
          this.$cube.append(this.top.init());
          
          this.setPosition();
          return this.$cube;
        }

        rotation() {
          const degrees = {
            x: Math.floor(Math.random() * 300 + 60),
            y: Math.floor(Math.random() * 300 + 60),
            z: Math.floor(Math.random() * 300 + 60)
          };

          this.animation = gsap.to(this.$cube[0], {
            rotateX: degrees.x,
            rotateY: degrees.y,
            rotateZ: degrees.z,
            duration: 10,
            ease: "none",
            onStart: () => {
              this.rotationDegrees = degrees;
            },
            onComplete: () => {
              this.rotation();
            }
          });
        }

        changeColor() {
          this.front.changeColor();
          this.left.changeColor();
          this.right.changeColor();
          this.back.changeColor();
          this.bottom.changeColor();
          this.top.changeColor();
        }

        move() {
          const x = Math.floor(
            Math.random() * ($(window).width() - (cubeGap + cubeHeight)) + cubeGap
          );
          const y = Math.floor(
            Math.random() * ($(window).height() - (cubeGap + cubeHeight)) + cubeGap
          );

          gsap.to(this.$cube[0], {
            left: x,
            top: y,
            duration: 20,
            ease: "none",
            onStart: () => {
              this.coordinates = { x, y };
            },
            onComplete: () => {
              this.move();
            }
          });
        }

        setPosition() {
          const x = Math.floor(
            Math.random() * ($(window).width() - (cubeGap + cubeHeight)) + cubeGap
          );
          const y = Math.floor(
            Math.random() * ($(window).height() - (cubeGap + cubeHeight)) + cubeGap
          );
          
          this.coordinates = { x, y };
          this.$cube.css({
            top: `${y}px`,
            left: `${x}px`
          });
        }
      }

      class CubeWall {
        constructor(side) {
          this.side = side;
          this.$cubeWall = null;
          this.colors = {
            front: "#FD4912",
            right: "#FD4912",
            back: "rgba(245,222,159,0.6)",
            left: "rgba(255,153,122,0.6)",
            bottom: "#FD4912",
            top: "rgba(245,222,159,0.6)"
          };
          this.colorOptions = [
            "#FD4912",
            "#FD4912",
            "rgba(245,222,159,0.6)",
            "rgba(255,153,122,0.6)",
            "#FD4912",
            "rgba(245,222,159,0.6)"
          ];
        }

        init() {
          this.$cubeWall = $('<div>', {
            class: `cube__face cube__face--${this.side}`
          });
          this.setColor(this.side);
          return this.$cubeWall;
        }

        setColor(side) {
          this.$cubeWall.css('background', this.colors[side]);
        }

        changeColor() {
          const color = this.colorOptions[Math.floor(Math.random() * this.colorOptions.length)];
          gsap.to(this.$cubeWall[0], {
            backgroundColor: color,
            duration: 10,
            ease: "none",
            onComplete: () => {
              this.changeColor();
            }
          });
        }
      }

      function spawnCube(i) {
        const cube = new Cube();
        cubes.push(cube);
        $('.container').append(cube.createAndAppend(i));
        cube.rotation();
        cube.move();
        cube.changeColor();
      }

      // Create 15 cubes
      for (let i = 0; i < 15; i++) {
        spawnCube(i);
      }
    

gsap.registerPlugin(ScrollTrigger);

// Timeline for .new-part-1
var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".circle",
    start: "0% 70%",
    end: "50% 50%",
    scrub: true,
  }
});

tl2.to(".circle .circle-wrapper", {
  height: 0,
  marginTop: 0,
  onUpdate: function () {
  }
});

// video scrolling animation
gsap.registerPlugin(ScrollTrigger);

// glow circle transition small to big  
gsap.fromTo("#glow-circle", 
  { scale: 0, opacity: 0 }, 
  { 
    scale: 2, 
    opacity: 1.5, 
    duration: 1.5, 
    y: "-50px",   
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#glow-circle",
      start: "top 100%",
      end: "bottom 70%",
      scrub: 1,
      toggleActions: "play none none reverse"
    }
  }
);

// image right roll
gsap.to(".right-roll", {
  rotation: 360,
  duration: 1.5,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".right-roll",
    start: "top 80%",
    end: "bottom 0%",
    scrub: 1,
    toggleActions: "play none none reverse"
  }
});

gsap.to(".right1-roll", {
  rotation: 360,
  duration: 2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".right1-roll",
    start: "top 75%",
    end: "bottom 0%",
    scrub: 1,
    toggleActions: "play none none reverse"
  }
});

// image left roll
gsap.to(".left-roll", {
  rotation: -360, // Counter-clockwise rotation
  duration: 2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".left-roll",
    start: "top 70%",
    end: "bottom 0%",
    scrub: 1,
    toggleActions: "play none none reverse"
  }
});

gsap.to(".left1-roll", {
  rotation: -360, // Counter-clockwise rotation
  duration: 2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".left1-roll",
    start: "top 65%",
    end: "bottom -10%",
    scrub: 1,
    toggleActions: "play none none reverse"
  }
});

// slide from bottom to top
gsap.set(".top-slide", { opacity: 0, y: "100px" });

gsap.to(".top-slide", {
  duration: 1.5,
  y: "-50px",      
  opacity: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".top-slide",
    start: "top 100%",   
    end: "bottom 50%",
    scrub: 1,         
    toggleActions: "play play reverse reverse" 
  }
});

gsap.set(".top1-slide", { opacity: 0, y: "100px" });

gsap.to(".top1-slide", {
  duration: 1.5,
  y: "-50px",      
  opacity: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".top1-slide",
    start: "top 100%",   
    end: "bottom 100%",
    scrub: 1,         
    toggleActions: "play play reverse reverse" 
  }
});

// slide to right
gsap.set(".right-slide", { opacity: 0, x: "100px" });

gsap.to(".right-slide", {
  duration: 1.5,
  x: "0px",      
  opacity: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".right-slide",
    start: "top 80%",   
    end: "bottom 50%",
    scrub: 1,         
    toggleActions: "play play reverse reverse" 
  }
});

// slide to left
gsap.set(".left-slide", { opacity: 0, x: "100px" });

gsap.to(".left-slide", {
  duration: 1.5,
  x: "0px",      
  opacity: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".left-slide",
    start: "top 80%",   
    end: "bottom 50%",
    scrub: 1,         
    toggleActions: "play play reverse reverse" 
  }
});

// sliding text
gsap.set(".email-slide", { opacity: 0, y: "-10px" });

gsap.to(".email-slide", {
  duration: 1.5,
  y: "0px",      
  opacity: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".email-slide",
    start: "top 80%",   
    end: "bottom 50%",
    scrub: 1,         
    toggleActions: "play play reverse reverse" 
  }
});

gsap.set(".phone-slide", { opacity: 0, y: "-10px" });

gsap.to(".phone-slide", {
  duration: 1.5,
  y: "0px",      
  opacity: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".phone-slide",
    start: "top 78%",   
    end: "bottom 50%",
    scrub: 1,         
    toggleActions: "play play reverse reverse" 
  }
});

gsap.set(".address-slide", { opacity: 0, y: "-10px"});

gsap.to(".address-slide", {
  duration: 1.5,
  y: "0px",      
  opacity: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".address-slide",
    start: "top 78%",   
    end: "bottom 76%",
    scrub: 1,         
    toggleActions: "play play reverse reverse" 
  }
});

// rolling image
document.querySelectorAll('.image-row').forEach((imageRow, index) => {
  const rowWidth = imageRow.scrollWidth;
  const moveDistance = 0.2 * rowWidth;

  // Alternate direction for each row for visual interest
  const direction = index % 2 === 0 ? 1 : -1;

  gsap.fromTo(imageRow, 
    { x: -direction * moveDistance }, 
    { 
      x: direction * moveDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: imageRow,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    }
  );
});

// // partnership looping animation
//   document.addEventListener("DOMContentLoaded", () => {
//       const list = document.querySelector(".partner-list");
//       // const itemCount = list.children.length;
//           gsap.set(list, { xPercent: 100 }); 
//       gsap.to(list, {
//         xPercent: -100,                
//         ease: "none",                  
//         duration: 14,                  
//         repeat: -1                     
//     });
// });

// reveal animation
gsap.registerPlugin(ScrollTrigger);

    const splitTypes = document.querySelectorAll('.reveal-type');

    splitTypes.forEach((element) => {
        const bg = element.dataset.bgColor;
        const fg = element.dataset.fgColor;

        // Split text into words instead of characters
        const text = new SplitType(element, { types: 'words' });

        gsap.fromTo(
            text.words, 
            {
                color: bg,
            },
            {
                color: fg,
                duration: 0.3,
                stagger: 0.1, 
                scrollTrigger: {
                    trigger: element,
                    start: 'top 100%',
                    end: 'top 40%',
                    scrub: true,
                    markers: false,
                    toggleActions: 'play play reverse reverse',
                },
            }
        );
    });

// transition for things we care about
gsap.timeline({
      scrollTrigger: {
          trigger: ".things-animation", // Specific trigger for Kiosk
          start: "top 85%",
          // end: "bottom 10%",
          toggleActions: "play none none reverse",
      }
  })
  .to(".things-animation .heading span", { // Specific to Kiosk
      y: '0%',
      duration: 0.7,
      stagger: 0.2,
  });


// transition for community
gsap.timeline({
      scrollTrigger: {
          trigger: ".community-animation", // Specific trigger for Kiosk
          start: "top 83%",
          // end: "bottom 10%",
          toggleActions: "play none none reverse",
      }
  })
  .to(".community-animation .heading span", { // Specific to Kiosk
      y: '0%',
      duration: 0.7,
      stagger: 0.2,
  });

// transition for moral
gsap.timeline({
      scrollTrigger: {
          trigger: ".moral-animation", // Specific trigger for Kiosk
          start: "top 81%",
          // end: "bottom 10%",
          toggleActions: "play none none reverse",
      }
  })
  .to(".moral-animation .heading span", { // Specific to Kiosk
      y: '0%',
      duration: 0.7,
      stagger: 0.2,
  });  

// transition for people
gsap.timeline({
      scrollTrigger: {
          trigger: ".people-animation", // Specific trigger for Kiosk
          start: "top 79%",
          // end: "bottom 10%",
          toggleActions: "play none none reverse",
      }
  })
  .to(".people-animation .heading span", { // Specific to Kiosk
      y: '0%',
      duration: 0.7,
      stagger: 0.2,
  }); 


// Title Animation
gsap.timeline({
  scrollTrigger: {
      trigger: ".title-animation", // Specific trigger for Kiosk
      start: "top 85%",
      end: "bottom 10%",
      toggleActions: "play none none reverse",
  }
})
.to(".title-animation .heading span", { // Specific to Kiosk
    y: '0%',
    duration: 0.7,
    stagger: 0.2,
});

gsap.utils.toArray('.text-name').forEach(elem => {
  gsap.fromTo(elem,
      { opacity: 0, y: -50 },
      {
      opacity: 1,
      y: 0,
      duration: .7,
      ease: 'power2.out',
      scrollTrigger: {
          trigger: elem,
          start: 'top 88%',
          // end: 'top 10%',
          toggleActions: 'play reverse play reverse '

      }
      }
  );
});

gsap.utils.toArray('.text-email').forEach(elem => {
  gsap.fromTo(elem,
      { opacity: 0, y: -50 },
      {
      opacity: 1,
      y: 0,
      duration: .7,
      ease: 'power2.out',
      scrollTrigger: {
          trigger: elem,
          start: 'top 86%',
          // end: 'top 10%',
          toggleActions: 'play reverse play reverse '

      }
      }
  );
});

gsap.utils.toArray('.text-message').forEach(elem => {
  gsap.fromTo(elem,
      { opacity: 0, y: -50 },
      {
      opacity: 1,
      y: 0,
      duration: .7,
      ease: 'power2.out',
      scrollTrigger: {
          trigger: elem,
          start: 'top 82%',
          // end: 'top 10%',
          toggleActions: 'play reverse play reverse'

      }
      }
  );
});

gsap.utils.toArray('.text-verify').forEach(elem => {
  gsap.fromTo(elem,
      { opacity: 0, y: -50 },
      {
      opacity: 1,
      y: 0,
      duration: .7,
      ease: 'power2.out',
      scrollTrigger: {
          trigger: elem,
          start: 'top 82%',
          // end: 'top 10%',
          toggleActions: 'play reverse play reverse '

      }
      }
  );
});

gsap.utils.toArray('.text-submit').forEach(elem => {
  gsap.fromTo(elem,
      { opacity: 0, y: -50 },
      {
      opacity: 1,
      y: 0,
      duration: .7,
      ease: 'power2.out',
      scrollTrigger: {
          trigger: elem,
          start: 'top 79%',
          // end: 'top 10%',
          toggleActions: 'play reverse play reverse '

      }
      }
  );
});


requestAnimationFrame(raf);


// team profile animation
// export default {
//   content: ["./index.html", "./src/**/*.{ts,tsx}"],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ["SF Pro", "sans-serif"],
//       },
//       colors: {
//         primary: "var(--color-primary)",
//       },
//       backgroundImage: {
//         texture:
//           "url(/glow-texture.png), radial-gradient(var(--color-primary), transparent 70%)",
//       },
//     },
//   },
//   plugins: [],
//   };
