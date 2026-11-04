# November implementation improvements

`quizReviewPlan(questions, answers, limit)` returns a bounded ID list with unanswered questions before incorrect questions, retaining bank order within each group. It reuses saved-answer validation, omits correct questions and never exports answer keys. This adds an API, not a new learner screen.
