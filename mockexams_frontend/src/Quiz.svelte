<script>
import Option from './Option.svelte';
import Question from './Question.svelte';
</script>

<Question>
What is the answer to abcd?
</Question>
<div class="options">
<Option>
A. Option A
</Option>
<Option>
B. Option B
</Option>
<Option>
C. Option C
</Option>
<Option>
D. Option D
</Option>
</div>

<style>
.options{
display:block;
}

</style>
