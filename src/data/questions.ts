export type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  shuffleOptions: boolean;
};

export type Lesson = {
  title: string;
  questions: Question[];
};

export const lessons: Lesson[] = [
  {
    title: "Bài 15: Bí tích Rửa tội",
    questions: [
      {
        id: "b15_q1",
        text: "Bí tích Rửa tội ban cho ta những ơn nào ?",
        options: [
          "Bí tích Rửa tội chỉ tha những tội riêng ta đã phạm",
          "Bí tích Rửa tội tha cho ta tội tổ tông",
          "Bí tích Rửa tội cho ta sạch tội tổ tông, các tội ta đã phạm, được gia nhập vào Hội Thánh và được làm con cái Chúa"
        ],
        correctAnswerIndex: 2,
        shuffleOptions: true,
      },
      {
        id: "b15_q2",
        text: "Người lãnh nhận bí tích Rửa tội thề hứa những gì ?",
        options: [
          "Họ hứa từ bỏ ma quỷ và các cám dỗ của ma quỷ",
          "Họ tuyên xưng đức tin và Thiên Chúa và các mầu nhiệm Kitô giáo",
          "Họ tuân giữ các giới răn, trung thành với Chúa và Hội Thánh của Ngài",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 3,
        shuffleOptions: false,
      },
      {
        id: "b15_q3",
        text: "Thừa tác viên thông thường của Bí tích Rửa tội là những ai ?",
        options: [
          "Giám mục, linh mục và phó tế",
          "Giám mục, linh mục",
          "Tất cả mọi người",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 0,
        shuffleOptions: false,
      },
      {
        id: "b15_q4",
        text: "Khi rửa tội, các thừa tác viên vừa đổ nước vừa đọc ?",
        options: [
          "\"Tôi rửa ông/bà/anh/chị/em [Tên Thánh], nhân danh Cha và Con và Thánh Thần\"",
          "[Tên Thánh], tôi rửa ông/bà/anh/chị/em, nhân danh Cha và Con và Thánh Thần",
          "\"Nhân danh Cha và Con và Thánh Thần, tôi rửa ông/bà/anh/chị/em [Tên Thánh]\"",
          "\"Nhân danh Cha và Con và Thánh Thần, [Tên Thánh] tôi rửa ông/bà/anh/chị/em.\""
        ],
        correctAnswerIndex: 1,
        shuffleOptions: true,
      },
      {
        id: "b15_q5",
        text: "Khi phán : \"Các con hãy đi và làm cho muôn dân trở thành môn đệ...\", Chúa Giêsu đã thiết lập bí tích nào ?",
        options: [
          "Bí Tích Rửa Tội",
          "Bí Tích Thêm Sức",
          "Bí Tích Giao hòa",
          "Bí Tích xức dầu bệnh nhân"
        ],
        correctAnswerIndex: 0,
        shuffleOptions: true,
      },
      {
        id: "b15_q6",
        text: "Thời kỳ nào người ta tìm cách rửa tội cho trẻ sơ sinh càng sớm càng tốt ?",
        options: [
          "Thời Trung Cổ",
          "Thời các Giáo Phụ",
          "Thời các Tông Đồ",
          "Sau công đồng Vaticano II"
        ],
        correctAnswerIndex: 0,
        shuffleOptions: true,
      },
      {
        id: "b15_q7",
        text: "Ai là người có thể ban bí tích Rửa Tội trong các trường hợp khẩn cấp ?",
        options: [
          "Chỉ Giám mục, linh mục và phó tế mới có thể cử hành Bí Tích Rửa Tội",
          "Khi khẩn cấp, bất kỳ ai cũng có thể ban Bí Tích Rửa Tội miễn là làm theo chỉ dẫn của Hội Thánh",
          "Ngoài hàng giáo sĩ, không ai có quyền ban Bí Tích Rửa Tội kể cả trong trường hợp khẩn cấp",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 1,
        shuffleOptions: false,
      },
      {
        id: "b15_q8",
        text: "Đâu là công thức phải đọc khi cử hành Bí Tích Rửa Tội trong trường hợp khẩn cấp ?",
        options: [
          "Tôi rửa ông(hoặc bà, anh, chị, con, cháu….) nhân danh Cha và Con và Thánh Thần",
          "Theo lời Chúa Giêsu đã dạy, tôi nhân danh Thiên Chúa là Cha và Con và Thánh Thần...",
          "Tôi rửa tội cho ông(hoặc bà...) như lời Chúa Giêsu đã dạy",
          "Như lời Chúa Giêsu đã dạy: nhân danh Cha và Con và Thánh Thần"
        ],
        correctAnswerIndex: 0,
        shuffleOptions: true,
      },
      {
        id: "b15_q9",
        text: "Chọn ra 1 quyết tâm sống Bí Tích Rửa Tội trong các điều sau",
        options: [
          "Sống thoải mái theo bản năng vì khi đã được Rửa Tội thì ta chắc chắn sẽ được lên thiên đàng",
          "Luôn sống trong tâm tình biết ơn, cảm tạ và hân hoan vì được làm con Chúa",
          "Sống tin tưởng, phó thác vào sự quan phòng của Cha trên trời vì xác tín rằng Ngài luôn yêu thương, gìn giữ và săn sóc ta",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 1,
        shuffleOptions: false,
      }
    ]
  },
  {
    title: "Bài 16: Bí tích Thêm Sức",
    questions: [
      {
        id: "b16_q1",
        text: "Ai là người thiết lập bí tích thêm sức",
        options: [
          "Chúa Giêsu",
          "Các thánh tông đồ",
          "Các giáo phụ",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 0,
        shuffleOptions: false,
      },
      {
        id: "b16_q2",
        text: "Bí tích Thêm Sức được Chúa Giêsu thiết lập khi nào ?",
        options: [
          "Khi Chúa Giêsu đi rao giảng Tin Mừng",
          "Chiều ngày Chúa Giêsu Phục Sinh",
          "Khi Chúa Giêsu sinh thì trên Thánh Giá",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 1,
        shuffleOptions: false,
      },
      {
        id: "b16_q3",
        text: "Thứ tự cử hành bí tích Thêm Sức",
        options: [
          "Tuyên xưng đức tin, lời nguyện xin ban Chúa Thánh Thần, xức dầu Thánh, lời nguyện chung",
          "Lời nguyện xin ban Chúa Thánh Thần, xức dầu Thánh, tuyên xưng đức tin, lời nguyện chung",
          "Tuyên xưng đức tin, lời nguyện chung, lời nguyện xin ban Chúa Thánh Thần, xức dầu Thánh",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 0,
        shuffleOptions: false,
      },
      {
        id: "b16_q4",
        text: "Hiệu quả của bí tích Thêm Sức",
        options: [
          "Giúp tăng trưởng và đào sâu ơn bí tích Rửa tội",
          "Ấn tín của Chúa Thánh Thần",
          "Cả 2 ý trên đều đúng"
        ],
        correctAnswerIndex: 2,
        shuffleOptions: false,
      }
    ]
  },
  {
    title: "Bài 17: Bí tích Thánh Thể",
    questions: [
      {
        id: "b17_q1",
        text: "Chất liệu chính của Bí tích Thánh Thể là ?",
        options: [
          "Bánh miến",
          "Rượu nho",
          "Bánh miến và rượu nho"
        ],
        correctAnswerIndex: 2,
        shuffleOptions: true,
      },
      {
        id: "b17_q2",
        text: "Bí tích Thánh Thể do ai thiết lập?",
        options: [
          "Chúa Giêsu",
          "Các thánh tông đồ",
          "Các Thánh giáo phụ"
        ],
        correctAnswerIndex: 0,
        shuffleOptions: true,
      },
      {
        id: "b17_q3",
        text: "Chúa Giêsu thiết lập Bí tích Thánh Thể khi nào ?",
        options: [
          "Khi Chúa chịu đóng đinh trên Thập giá",
          "Trong Bữa Tiệc Ly vào chiều thứ 5 tuần Thánh",
          "Khi Chúa Phục Sinh",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 1,
        shuffleOptions: false,
      },
      {
        id: "b17_q4",
        text: "Ý nghĩa của Bí tích Thánh Thể ?",
        options: [
          "Tưởng niệm hy tế của Đức Ki-tô",
          "Bữa tiệc huynh đệ",
          "Cả 2 ý trên đều đúng"
        ],
        correctAnswerIndex: 2,
        shuffleOptions: false,
      },
      {
        id: "b17_q5",
        text: "Các hình thức tôn thờ Bí tích Thánh Thể ?",
        options: [
          "Chầu Thánh Thể",
          "Kiệu Thánh Thể",
          "Viếng Chúa",
          "Lần hạt mân Côi",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 4,
        shuffleOptions: false,
      },
      {
        id: "b17_q6",
        text: "Chúng ta sống Bí tích Thánh Thể như thế nào ?",
        options: [
          "Năng đến thờ lạy Thánh Thể",
          "Cung kính khi vào nhà Thờ",
          "Cúi mình trước nhà Tạm",
          "Trở nên tấm bánh trao ban cho mọi người bằng cách chia sẻ thời gian, khả năng",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 4,
        shuffleOptions: false,
      }
    ]
  },
  {
    title: "Bài 18: Thánh Lễ",
    questions: [
      {
        id: "b18_q1",
        text: "Thánh lễ gồm mấy phần",
        options: [
          "1 phần",
          "2 phần",
          "3 phần"
        ],
        correctAnswerIndex: 1,
        shuffleOptions: true,
      },
      {
        id: "b18_q2",
        text: "Thứ tự của phụng vụ Lời Chúa?",
        options: [
          "Các bài đọc, đáp ca, alleluia, bài diễn giảng, kinh Tin kính, lời nguyện tín hữu",
          "Bài diễn giảng, các bài đọc, đáp ca, alleluia, kinh Tin kính, lời nguyện tín hữu",
          "Kinh Tin kính, lời nguyện tín hữu, Các bài đọc, đáp ca, alleluia, bài diễn giảng"
        ],
        correctAnswerIndex: 0,
        shuffleOptions: true,
      },
      {
        id: "b18_q3",
        text: "Thứ tự của phụng vụ Thánh Thể?",
        options: [
          "Chuẩn bị lễ phẩm, kinh nguyện Thánh Thể, nghi thức hiệp lễ",
          "Kinh nguyện Thánh Thể, chuẩn bị lễ phẩm, nghi thức hiệp lễ",
          "Nghi thức hiệp lễ, chuẩn bị lễ phẩm, kinh nguyện Thánh Thể"
        ],
        correctAnswerIndex: 0,
        shuffleOptions: true,
      },
      {
        id: "b18_q4",
        text: "Điều kiện để rước lễ?",
        options: [
          "Sạch tội trọng",
          "Giữ Chay Thánh Thể",
          "Cả 2 ý trên đều đúng"
        ],
        correctAnswerIndex: 2,
        shuffleOptions: false,
      },
      {
        id: "b18_q5",
        text: "Hiệu quả của việc rước lễ?",
        options: [
          "Giúp ta được kết hiệp mật thiết với Đức Ki-tô",
          "Giúp củng cố sự hiệp thông giữa chúng ta và Hội Thánh",
          "Tha các tội nhẹ, gia tăng ân sủng giúp chúng ta tránh xa tội lỗi",
          "Giúp chúng ta biết sống bác ái hơn, đặc biệt với người nghèo khổ, túng thiếu",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 4,
        shuffleOptions: false,
      },
      {
        id: "b18_q6",
        text: "Sống Thánh Lễ như thế nào?",
        options: [
          "Chuẩn bị tâm hồn trước khi tham dự Thánh lễ",
          "Tích cực và thành kính khi tham dự",
          "Thực hành lời Chúa dạy trong đời sống hàng ngày",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 3,
        shuffleOptions: false,
      }
    ]
  },
  {
    title: "Bài 20: Bí tích Giao hòa",
    questions: [
      {
        id: "b20_q1",
        text: "Ai thiết lập bí tích giao hòa ?",
        options: [
          "Chúa Giê-su",
          "Các Thánh tông đồ",
          "Giám mục, linh mục",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 0,
        shuffleOptions: false,
      },
      {
        id: "b20_q2",
        text: "Các bước cần chuẩn bị để lãnh bí tích giao hòa",
        options: [
          "Xét mình, ăn năn dốc lòng chừa, xưng tội, đền tội",
          "Ăn năn dốc lòng chừa, xét mình, xưng tội, đền tội",
          "Đền tội, ăn năn dốc lòng chừa, xét mình, xưng tội",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 0,
        shuffleOptions: false,
      },
      {
        id: "b20_q3",
        text: "Thừa tác viên của bí tích giao hòa là ai",
        options: [
          "Giám mục và linh mục",
          "Hối nhân",
          "Giám mục, linh mục, hối nhân",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 0,
        shuffleOptions: false,
      },
      {
        id: "b20_q4",
        text: "Hiệu quả của bí tích giao hòa",
        options: [
          "Giúp hối nhân được giao hòa với Thiên Chúa",
          "Giúp hối nhân giao hòa với Hội Thánh",
          "Được tha thứ hình phạt đời đời, được thư thái bình an trong tâm hồn",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 3,
        shuffleOptions: false,
      },
      {
        id: "b20_q5",
        text: "Bí tích giao hòa còn có các tên gọi khác như",
        options: [
          "Bí tích hối cải",
          "Bí tích thống hối",
          "Bí tích xưng tội",
          "Bí tích giải tội",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 4,
        shuffleOptions: false,
      },
      {
        id: "b20_q6",
        text: "Thường xuyên lãnh bí tích giao hòa giúp ta",
        options: [
          "Có lương tâm nhạy bén, tinh tế",
          "Có sức chiến đấu lại các khuynh hướng xấu",
          "Gắn bó hơn với Đức Ki-tô và Hội Thánh",
          "Nhận được ơn Chúa nâng đỡ để tiến bước trên con đường nên Thánh",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 4,
        shuffleOptions: false,
      }
    ]
  },
  {
    title: "Bài 21: Bí tích xức dầu bệnh nhân",
    questions: [
      {
        id: "b21_q1",
        text: "Các bước cử hành bí tích xức dầu bệnh nhân",
        options: [
          "Lời Chúa, Lời nguyện và xức dầu, rước lễ",
          "Lời nguyện và xức dầu, rước lễ, Lời Chúa",
          "Rước lễ, Lời Chúa, Lời nguyện và xức dầu"
        ],
        correctAnswerIndex: 0,
        shuffleOptions: true,
      },
      {
        id: "b21_q2",
        text: "Ai có quyền ban bí tích xức dầu bệnh nhân",
        options: [
          "Giám mục, linh mục",
          "Tu sĩ",
          "Thừa tác viên",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 0,
        shuffleOptions: false,
      },
      {
        id: "b21_q3",
        text: "Ai được nhận bí tích xức dầu bệnh nhân",
        options: [
          "Mọi tín hữu khi đến tuổi khôn mà lâm bệnh hay nguy tử",
          "Chỉ những người lớn tuổi",
          "Những người mắc bệnh nặng",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 0,
        shuffleOptions: false,
      },
      {
        id: "b21_q4",
        text: "Hiệu quả của bí tích xức dầu bệnh nhân",
        options: [
          "Giúp bệnh nhân được kết hợp chặt chẽ hơn với cuộc khổ nạn của Đức Ki-tô",
          "Mang lại cho bệnh nhân sự an ủi, bình an, lòng can đảm để đón nhận đau khổ",
          "Mang lại ơn tha tội, chuẩn bị cho bệnh nhân bước vào đời sống vĩnh hằng",
          "Đem lại ơn chữa lành nếu Thiên Chúa muốn",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 4,
        shuffleOptions: false,
      }
    ]
  },
  {
    title: "Bài 23: Bí tích Truyền chức Thánh",
    questions: [
      {
        id: "b23_q1",
        text: "Trong thời Cựu Ước, chi tộc nào giữ chức vụ lo việc tế tự ?",
        options: [
          "Chi tộc Ít-ra-en",
          "Chi tộc Giu-đa",
          "Chi tộc Lê-vi",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 2,
        shuffleOptions: false,
      },
      {
        id: "b23_q2",
        text: "Con người tham dự vào chức tư tế duy nhất của Đức Ki-tô qua ?",
        options: [
          "Chức tư tế cộng đồng (tất cả các tín hữu được thánh hiến để trở nên hàng tư tế thánh)",
          "Chức tư tế thừa tác (một số người nam được Thiên Chúa chọn để tham dự vào chức tư tế của Đức Ki-tô)",
          "Cả 2 ý trên đều đúng"
        ],
        correctAnswerIndex: 2,
        shuffleOptions: false,
      },
      {
        id: "b23_q3",
        text: "Các bậc của bí tích truyền chức Thánh ?",
        options: [
          "Giám mục",
          "Linh mục",
          "Phó tế",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 3,
        shuffleOptions: false,
      },
      {
        id: "b23_q4",
        text: "Ai có quyền ban bí tích truyền chức Thánh ?",
        options: [
          "Giám mục",
          "Linh mục",
          "Giám mục và linh mục",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 0,
        shuffleOptions: false,
      },
      {
        id: "b23_q5",
        text: "Ai có quyền nhận bí tích truyền chức Thánh ?",
        options: [
          "Tất cả những ai đã rửa tội theo nghi thức Kitô giáo",
          "Chỉ những người nam đã được rửa tội, được đào tạo theo giáo luật, tự viết đơn xin phong chức",
          "Cả 2 ý trên đều đúng"
        ],
        correctAnswerIndex: 1,
        shuffleOptions: false,
      },
      {
        id: "b23_q6",
        text: "Hiệu quả của bí tích truyền chức Thánh",
        options: [
          "Ấn tín vĩnh viễn",
          "Ơn Chúa Thánh Thần",
          "Cả 2 ý trên đều đúng"
        ],
        correctAnswerIndex: 2,
        shuffleOptions: false,
      }
    ]
  },
  {
    title: "Bài 24: Bí tích Hôn phối",
    questions: [
      {
        id: "b24_q1",
        text: "Trong kinh Thánh, hôn nhân được diễn tả qua hình ảnh nào ?",
        options: [
          "Sự ký kết giao ước giữa 1 người nam và 1 người nữ (Hôn nhân tự nhiên)",
          "Giao ước giữa Thiên Chúa với dân của Ngài (Trong Cựu Ước)",
          "Sự kết hợp giữa Đức Ki-tô và Hội Thánh (Trong Tân Ước)",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 3,
        shuffleOptions: false,
      },
      {
        id: "b24_q2",
        text: "Đặc tính của hôn nhân Ky-tô giáo là",
        options: [
          "Đơn nhất, nghĩa là 1 vợ 1 chồng",
          "Bất khả phân ly, nghĩa là không thể ly dị",
          "Cả 2 ý trên đều đúng"
        ],
        correctAnswerIndex: 2,
        shuffleOptions: false,
      },
      {
        id: "b24_q3",
        text: "Mục đích của hôn nhân Ky-tô giáo là",
        options: [
          "Vợ chồng yêu thương và bổ túc cho nhau",
          "Cộng tác với Thiên Chúa trong việc sinh sản và giáo dục con cái",
          "Cả 2 ý trên đều đúng"
        ],
        correctAnswerIndex: 2,
        shuffleOptions: false,
      },
      {
        id: "b24_q4",
        text: "Thừa tác viên của Bí Tích Hôn Phối là",
        options: [
          "Giám mục, Linh mục",
          "Cô dâu, chú rể",
          "Cô dâu, chú rể và gia đình hai họ"
        ],
        correctAnswerIndex: 1,
        shuffleOptions: true,
      },
      {
        id: "b24_q5",
        text: "Để bí tích hôn nhân thành sự, cần những điều kiện nào ?",
        options: [
          "Phải là một nam, một nữ, đã được rửa tội",
          "Phải đủ tuổi theo giáo luật quy định: nữ 18 tuổi trở lên, nam từ 20 tuổi trở lên",
          "Có sự tự do để kết hôn",
          "Công khai bày tỏ sự ưng thuận trước mặt vị chứng hôn có thẩm quyền",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 4,
        shuffleOptions: false,
      },
      {
        id: "b24_q6",
        text: "Nghi thức cử hành Bí Tích Hôn Phối theo trình tự nào ?",
        options: [
          "Thẩm vấn đôi tân hôn, Trao đổi lời thề, làm phép và trao nhẫn cưới",
          "Trao đổi lời thề, làm phép và trao nhẫn cưới, Thẩm vấn đôi tân hôn",
          "Thẩm vấn đôi tân hôn, làm phép và trao nhẫn cưới, Trao đổi lời thề",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 0,
        shuffleOptions: false,
      }
    ]
  },
  {
    title: "Bài 26: Những cử hành phụng vụ khác",
    questions: [
      {
        id: "b26_q1",
        text: "Á bí tích do ai thiết lập ?",
        options: [
          "Chúa Giê-su thiết lập",
          "Các tông đồ thiết lập",
          "Hội Thánh thiết lập",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 2,
        shuffleOptions: false,
      },
      {
        id: "b26_q2",
        text: "Có mấy loại Á bí tích ?",
        options: [
          "2",
          "3",
          "4"
        ],
        correctAnswerIndex: 0,
        shuffleOptions: true,
      },
      {
        id: "b26_q3",
        text: "Thông thường, thừa tác viên Á bí tích là ai?",
        options: [
          "Giám mục",
          "Linh mục",
          "Phó tế",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 3,
        shuffleOptions: false,
      }
    ]
  },
  {
    title: "Bài 27: Việc đạo đức bình dân",
    questions: [
      {
        id: "b27_q1",
        text: "Việc đạo đức Bình Dân là ?",
        options: [
          "Một hoạt động trong giáo hội Công Giáo",
          "Một cách thức cầu nguyện của người Công Giáo",
          "Một công việc bác ái từ thiện",
          "Tất cả các ý trên đều đúng"
        ],
        correctAnswerIndex: 1,
        shuffleOptions: false,
      },
      {
        id: "b27_q2",
        text: "Đối tượng của việc đạo đức Bình Dân gồm ?",
        options: [
          "Chúa Giê-su, Mẹ Maria, các Thánh, các tín hữu đã qua đời",
          "Chúa Cha, Chúa Giê-su, Chúa Thánh Thần",
          "Cả 2 ý trên đều đúng"
        ],
        correctAnswerIndex: 0,
        shuffleOptions: false,
      }
    ]
  }
];
