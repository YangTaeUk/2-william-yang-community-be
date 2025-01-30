📷 과제용 Community\
\
📌 프로젝트 개요\
\
MUI(Material-UI)와 nodejs express를 사용하여 Community내용을 개발하였습니다. \
사용자들이 피드를 작성하고, 댓글을 남기며, 계정을 관리할 수 있는 기능을 간단하게 포함합니다.\
본 프로젝트는 2-william-yang-community-fe(프론트엔드)와 \
2-william-yang-community-be(백엔드)로 구성되어 있으며, 상호 연동되어 동작합니다.\
이 프로젝트의 백엔드는 Express.js, Sequelize, PostgreSQL을 기반으로 한 API 서버입니다. \
사용자는 회원가입 및 로그인 후 게시글을 작성하고, 댓글을 달 수 있습니다.
\
\
\
🛠 기술 스택\
Frontend: React, React Router, Material-UI (MUI)\
Backend: Node.js (Express), Sequelize ORM\
Database: PostgreSQL\
Authentication: JWT (JSON Web Token)\
Storage: Multer (이미지 업로드)\
Security: bcrypt (비밀번호 해싱)\
Deployment: 로컬 개발 환경 기준
\
\
\
🔧 주요 기능\
\
\
🔑 사용자 인증 (JWT)\
회원가입 (POST /api/auth/register)\
로그인 (POST /api/auth/login)\
내 정보 조회 (GET /api/auth/me)\
사용자 정보 수정 (PATCH /api/auth/users/{userId})\
\
\
📰 피드 (Feed)\
게시글 목록 불러오기 (GET /api/posts?page={pageNum})\
무한 스크롤 기능 지원 (Intersection Observer 활용)\
댓글 목록 표시 (최대 2개)\
더 보기 버튼 클릭 시 전체 댓글 조회 가능 (모달 방식)\
이미지 없을 경우 기본 텍스트 영역 제공\
게시글 상세 보기 (모달 방식으로 구현)\
새 게시글 작성 페이지로 이동 버튼 제공\
\
\
📝 게시글 작성 (Posts)\
게시글 작성 (POST /api/posts)\
게시글 목록 조회 (5개씩 페이징) (GET /api/posts?page=1)\
특정 게시글 조회 (GET /api/posts/{id})\
게시글에 이미지 업로드 가능\
게시글 삭제 (DELETE /api/posts/{id})\
\
\
💬 댓글 기능 (Comments)\
댓글 추가 (POST /api/comments/{postId})\
게시글별 댓글 최대 2개 표시, 그 이상이면 '더 보기' 버튼 제공\
게시글의 댓글 목록 조회 (GET /api/comments/{postId})\
댓글 삭제 (DELETE /api/comments/{commentId})\
댓글 모달을 활용해 전체 댓글 조회\
댓글 입력 후 엔터 키 또는 등록 버튼 클릭 시 저장\
\
\
🔐 로그인 / 회원가입\
회원가입 (POST /api/auth/register): 이메일, 아이디, 비밀번호, 이름, 성 입력\
로그인 (POST /api/auth/login): JWT 발급 및 로컬 스토리지 저장\
JWT를 활용한 인증 처리 및 페이지 접근 제한\
로그인 후 JWT를 유지하고 API 요청 시 자동으로 추가\
\
\
⚙️ 계정 관리\
회원 정보 수정 (PATCH /api/auth/users/{userId})\
로그인 시 계정 정보를 가져와 자동 채우기 (GET /api/users/{userId})\
JWT 토큰 삭제를 통한 로그아웃 기능 구현\
\
\
📌 개선할 점\
이미지 업로드 시 미리보기 기능 추가\
좋아요 기능 구현 (POST /api/posts/{postId}/like)\
다크 모드 지원\
팔로우 / 언팔로우 기능 추가\
\
\
💡 기타 참고 사항\
현재 프로젝트는 로컬 환경을 기준으로 개발되었습니다.\
별도 환경에서 구동이 필요한 경우, DB설치 및 기타 프로세스가 필요합니다. \
JWT 인증 방식으로 API 요청 시 Authorization: Bearer {token} 헤더가 필요합니다.\
MUI 기반으로 UI를 구성했으며, 반응형 디자인을 적용하였습니다.

